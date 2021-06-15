import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { User } from '../entities/User';
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from 'typeorm';
import { House } from '../entities/House';
import { Review } from '../entities/Review';
import { MyContext } from '../types';
import { isAuth } from './../utils/middleware/isAuth';
import { FieldError } from "./types/ErrorFields";
import path from 'path';
import { createWriteStream } from 'fs';
import { processUpload } from './../utils/processImage';
import { deleteHouseImages } from './../utils/deleteHouseImages';



@InputType()
class ReviewInput {
    @Field(() => Int)
    houseId: number;
    @Field(() => Int)
    mark: number;
    @Field(() => String)
    text: string;
}

@ObjectType()
class HouseResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => House, { nullable: true })
    house?: House;
}

@InputType()
class HouseInput {
    @Field()
    title: string;
    @Field()
    description: string;
    @Field()
    country: string;
    @Field()
    street: string;
    @Field()
    city: string;
    @Field()
    state: string;
    @Field()
    apartment: string;
    @Field()
    zip: string;
    @Field()
    bed_count: number;
    @Field()
    bedroom_count: number;
    @Field()
    bathroom_count: number;
    @Field()
    guests_count: number;
    @Field()
    booking_can_advance_checker?: boolean;
    @Field()
    booking_can_advance_time?: string;
    @Field()
    booking_min: number;
    @Field()
    booking_max: number;
    @Field()
    price: number;
    @Field(() => [String])
    amenities!: string[];
    @Field(() => [String], { nullable: true })
    rules?: string[];
    @Field(() => [String], { nullable: true })
    safety_amenities?: string[];
    @Field()
    disability?: boolean;
    @Field(() => [String])
    avalible_dates: string[];
    @Field()
    address: string;
    @Field()
    longitude: number;
    @Field()
    booking_before: string;
    @Field()
    availability_arrivals_start: string;
    @Field()
    availability_arrivals_end: string;
    @Field()
    latitude: number;
    @Field({ nullable: true })
    rating?: number;
    @Field()
    house_typeId: number;
    @Field()
    room_typeId: number;
    @Field(() => [GraphQLUpload], { nullable: true })
    file: FileUpload[] | null;
}


@ObjectType()
class PaginatedHouses {
    @Field(() => [House])
    houses: House[];
    @Field()
    hasMore: boolean;
}

@Resolver(House)
export class HouseResolver {

    @FieldResolver(() => String)
    textSnippet(
        @Root() root: House
    ) {
        return root;
    }

    @FieldResolver(() => User)
    user(
        @Root() house: House,
        @Ctx() { userLoader }: MyContext
    ) {
        return userLoader.load(house.userId);
    }

    @FieldResolver(() => Review)
    async reviewCount(
        @Root() house: House,
        @Ctx() { reviewLoader }: MyContext
    ) {
        const review = await reviewLoader.load(house.id);
        return review.length;
    }


    @Mutation(() => HouseResponse)
    @UseMiddleware(isAuth)
    async createHouse(
        @Arg('input') input: HouseInput,
        @Ctx() { req }: MyContext
    ): Promise<HouseResponse> {

        let house;
        let pictureUrl: string[] = [];

        if (input.file) {
            pictureUrl = await processUpload(input.file, req.session.userId);
        } else {
            return {
                errors: [{
                    field: "file",
                    message: 'Загрузите хотя бы 1 изображение',
                }]
            }
        }

        house = await House.create({
            userId: req.session.userId,
            pictureUrl,
            ...input,
        }).save();

        return { house }
    }


    @Mutation(() => Boolean)
    async addHousePicture(
        @Arg('picture', () => GraphQLUpload) {
            createReadStream,
            filename
        }: FileUpload
    ): Promise<boolean> {
        return new Promise((res, rej) => {
            createReadStream()
                .pipe(createWriteStream(`${__dirname}/../images/${filename}`, { autoClose: true }))
                .on("finish", () => res(true))
                .on("error", () => rej(false));
        });
    }




    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async leaveReview(
        @Arg('options') options: ReviewInput,
        @Ctx() { req }: MyContext
    ) {
        const { userId } = req.session;

        const houseId = options.houseId;
        const reviewEqual = await Review.findOne({ where: { userId, houseId } });

        if (reviewEqual) {
            return false;
        } else {
            await Review.insert({
                ...options,
                userId
            });
        }

        return true;
    }


    @Query(() => PaginatedHouses)
    async houses(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedHouses> {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const qb = getConnection()
            .getRepository(House)
            .createQueryBuilder('h')
            // .addSelect(s => s.select('COUNT(*)').from('review', 're').where('re.houseId = h.id'), 'reviewCount')
            .innerJoinAndSelect("h.user", "u", "u.id = h.userId")
            .innerJoinAndSelect("h.room_type", "rt", "rt.id = h.room_typeId")
            .innerJoinAndSelect("h.house_type", "ht", "ht.id = h.house_typeId")
            .orderBy('h.createdAt', 'DESC')
            .take(realLimitPlusOne);
        // .addSelect("(SELECT COUNT(*) FROM review as re WHERE re.houseId = h.id)", "reviewCount")
        if (cursor) {
            qb.where('h.createdAt < :cursor', { cursor: new Date(parseInt(cursor)) });
        }

        const houses = await qb.getMany();


        // .subQuery()
        // .select('COUNT(re.houseId)', "reviewCount")
        // .from(Review, "re")

        // const replacements: any[] = [realLimitPlusOne];

        // if (cursor) {
        //     replacements.push(new Date(parseInt(cursor)));
        // } else {
        //     replacements.push(0);
        // }

        // const query = await getConnection().query(
        //     `
        //         call grabUserAndHouse(?, ?);
        //     `,
        //     replacements
        // );

        // console.dir(House.find({ relations: ['user', 'room_type', 'house_type'] }) as Promise<House[]>);

        return { houses: houses.slice(0, realLimit), hasMore: houses.length === realLimitPlusOne };

    }

    @Query(() => House, { nullable: true })
    async house(
        @Arg('id', () => Int) id: number,
    ): Promise<House | undefined> {

        return await House.findOne(id, { relations: ['user', 'room_type', 'house_type'] });
    }



    @Mutation(() => House, { nullable: true })
    @UseMiddleware(isAuth)
    async updateHouse(
        @Arg('id', () => Int) id: number,
        @Arg('title') title: string,
        @Ctx() { req }: MyContext
    ): Promise<House | null | undefined> {

        await House.update({ id, userId: req.session.userId }, { title });
        return await House.findOne({ id, userId: req.session.userId });

        // await getConnection()
        //     .createQueryBuilder()
        //     .update(House)
        //     .set({
        //         title,
        //     })
        //     .where('id = :id and userId = :userId', { id, userId: req.session.userId })
        //     .execute();
        // return result as any;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteHouse(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {

        try {
            const [{ pictureUrl }] = await House.find({ id });
            await House.delete({ id, userId: req.session.userId });
            await deleteHouseImages(pictureUrl, req.session.userId);
            return true;
        } catch {
            return false;
        }


    }
}