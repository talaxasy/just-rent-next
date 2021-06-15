import { Review } from './../entities/Review';
import { DefaultRules } from './../entities/DefaultRules';
import { DefaultAmenities } from './../entities/DefaultAmenities';
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getRepository } from 'typeorm';
import { HouseType } from './../entities/HouseType';
import { RoomType } from './../entities/RoomType';
import { SafetyAmeneties } from './../entities/SafetyAmeneties';


@Resolver()
export class DefaultEntities {

    @Query(() => [HouseType])
    async defaultHouseTypes(): Promise<HouseType[]> {
        const qb = await getRepository(HouseType)
            .createQueryBuilder("defaultHT")
            .getMany();

        return qb;
    }

    @Query(() => [SafetyAmeneties])
    async safetyAmenities(): Promise<SafetyAmeneties[]> {
        const qb = await getRepository(SafetyAmeneties)
            .createQueryBuilder("safetyA")
            .getMany();

        return qb;
    }

    @Query(() => [RoomType])
    async defaultRoomTypes(): Promise<RoomType[]> {
        const qb = await getRepository(RoomType)
            .createQueryBuilder("defaultRT")
            .getMany();

        return qb;
    }

    @Query(() => [DefaultAmenities])
    async defaultAmenities(): Promise<DefaultAmenities[]> {
        const qb = await getRepository(DefaultAmenities)
            .createQueryBuilder("defaultA")
            .getMany();

        return qb;
    }

    @Query(() => [DefaultRules])
    async defaultRules(): Promise<DefaultRules[]> {
        const qb = await getRepository(DefaultRules)
            .createQueryBuilder("defaultR")
            .getMany();

        return qb;
    }

    @Query(() => [Review])
    async reviews(
        @Arg('houseId', () => Int) houseId: number
    ): Promise<Review[]> {

        return await getRepository(Review)
            .createQueryBuilder("reviews")
            .where('houseId = :houseId', { houseId })
            .getMany();
    }

}