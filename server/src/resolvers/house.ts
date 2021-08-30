import {FileUpload, GraphQLUpload} from 'graphql-upload';
import moment from 'moment';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {getConnection, MoreThanOrEqual, Not} from 'typeorm';
import {Booking} from '../entities/Booking';
import {House} from '../entities/House';
import {Review} from '../entities/Review';
import {User} from '../entities/User';
import {MyContext} from '../types';
import {deleteHouseImages} from './../utils/deleteHouseImages';
import {isAuth} from './../utils/middleware/isAuth';
import {processUpload} from './../utils/processImage';
import {FieldError} from './types/ErrorFields';

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
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(() => House, {nullable: true})
  house?: House;
}

@InputType()
class SearchInput {
  @Field({nullable: true})
  country?: string;
  @Field({nullable: true})
  street?: string;
  @Field({nullable: true})
  city?: string;
  @Field({nullable: true})
  state?: string;
  @Field({nullable: true})
  apartment?: string;
  @Field({nullable: true})
  bed_count?: number;
  @Field({nullable: true})
  guests_count?: number;
  @Field({nullable: true})
  startDate?: boolean;
  @Field({nullable: true})
  endDate?: string;
  @Field({nullable: true})
  price?: number;
  @Field({nullable: true})
  lat?: number;
  @Field({nullable: true})
  lng?: number;
  @Field({nullable: true})
  rating?: number;
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
  @Field(() => [String], {nullable: true})
  rules?: string[];
  @Field(() => [String], {nullable: true})
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
  @Field({nullable: true})
  rating?: number;
  @Field()
  house_typeId: number;
  @Field()
  room_typeId: number;
  @Field(() => [GraphQLUpload], {nullable: true})
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
  textSnippet(@Root() root: House) {
    return root;
  }

  @FieldResolver(() => User)
  user(@Root() house: House, @Ctx() {userLoader}: MyContext) {
    return userLoader.load(house.userId);
  }

  @FieldResolver(() => Review)
  async reviewCount(@Root() house: House, @Ctx() {reviewLoader}: MyContext) {
    const review = await reviewLoader.load(house.id);
    return review.length;
  }

  @Query(() => [House], {nullable: true})
  async searchListings(
    @Arg('input') {guests_count, city, country, street, state}: SearchInput
  ): Promise<House[] | undefined> {
    let listing = getConnection().getRepository(House).createQueryBuilder('h');

    let step1: null | House[] = null;
    if (city && state && street && country && guests_count) {
      step1 = await House.find({
        where: {city, state, street, country, guests_count: MoreThanOrEqual(guests_count)},
      });
    }

    let step2: null | House[] = null;
    if (city && state && street && guests_count) {
      step2 = await House.find({
        where: {city, state, street, guests_count: MoreThanOrEqual(guests_count)},
      });
    }

    let step3: null | House[] = null;
    if (city && state && guests_count) {
      step3 = await House.find({where: {city, state, guests_count: MoreThanOrEqual(guests_count)}});
    }

    let step4: null | House[] = null;
    if (street && state && guests_count) {
      step4 = await House.find({
        where: {street, state, guests_count: MoreThanOrEqual(guests_count)},
      });
    }

    let step5: null | House[] = null;
    if (state && guests_count) {
      step5 = await House.find({where: {state, guests_count: MoreThanOrEqual(guests_count)}});
    }

    let step6: null | House[] = null;
    if (street && guests_count) {
      step6 = await House.find({where: {street, guests_count: MoreThanOrEqual(guests_count)}});
    }

    let step7: null | House[] = null;
    if (city && guests_count) {
      step7 = await House.find({where: {city, guests_count: MoreThanOrEqual(guests_count)}});
    }

    let step8: null | House[] = null;
    if (country && guests_count) {
      step8 = await House.find({where: {country, guests_count: MoreThanOrEqual(guests_count)}});
    }
    if (step1?.length) {
      return step1;
    }
    if (step2?.length) {
      return step2;
    }
    if (step3?.length) {
      return step3;
    }
    if (step4?.length) {
      return step4;
    }
    if (step5?.length) {
      return step5;
    }
    if (step6?.length) {
      return step6;
    }
    if (step7?.length) {
      return step7;
    }
    if (step8?.length) {
      return step8;
    }

    return undefined;
  }

  @Query(() => [Booking], {nullable: true})
  async getCustomerBookings(
    @Arg('finished', () => Boolean, {nullable: true}) finished: boolean,
    @Ctx() {req}: MyContext
  ): Promise<Booking[] | undefined> {
    const qb = getConnection()
      .getRepository(Booking)
      .createQueryBuilder('b')
      .innerJoinAndSelect('b.user', 'u', 'u.id = b.userId')
      .innerJoinAndSelect('b.house', 'h', 'h.id = b.houseId')
      .orderBy('h.createdAt', 'DESC')
      .where('b.userId = :userId', {userId: req.session.userId});

    if (!finished) {
      qb.andWhere(`b.status != 'завершен'`);
    } else {
      qb.andWhere(`b.status = 'завершен'`);
    }

    return await qb.getMany();
  }

  @Query(() => [Booking], {nullable: true})
  async getAdminBookings(
    @Arg('finished', () => Boolean, {nullable: true}) finished: boolean,
    @Ctx() {req}: MyContext
  ): Promise<Booking[] | undefined> {
    const adminHouses = await House.find({userId: req.session.userId});

    if (!adminHouses.length) {
      return undefined;
    }

    const houseIds = adminHouses.map(el => {
      return el.id;
    });

    if (!houseIds.length) {
      return undefined;
    }

    const bookingList = getConnection()
      .getRepository(Booking)
      .createQueryBuilder('b')
      .innerJoinAndSelect('b.user', 'u', 'u.id = b.userId')
      .innerJoinAndSelect('b.house', 'h', 'h.id = b.houseId')
      .orderBy('h.createdAt', 'DESC')
      .where(`houseId IN(${houseIds as number[]})`);

    if (!finished) {
      bookingList.andWhere(`b.status != 'завершен'`);
    } else {
      bookingList.andWhere(`b.status = 'завершен'`);
    }

    return await bookingList.getMany();
  }

  @Query(() => [String])
  async getBookings(@Arg('houseId', () => Int) houseId: number): Promise<string[]> {
    const disabledDates = await Booking.find({houseId, status: Not('завершен')});

    let tempDates: string[] = [];

    disabledDates.forEach(el => {
      let fromDate = moment(el.startDate);
      let toDate = moment(el.endDate);

      while (fromDate <= toDate) {
        let ld = fromDate.format('DD-MM-YY');
        tempDates.push(ld);
        fromDate = moment(fromDate).add(1, 'days');
      }
    });

    return tempDates;
  }

  @Mutation(() => [String])
  @UseMiddleware(isAuth)
  async doBooking(
    @Arg('startDate', () => String) startDate: string,
    @Arg('endDate', () => String) endDate: string,
    @Arg('guests_count', () => Int) guests_count: number,
    @Arg('houseId', () => Int) houseId: number,
    @Ctx() {req}: MyContext
  ): Promise<string[]> {
    try {
      await Booking.insert({
        startDate: new Date(parseInt(startDate)),
        endDate: new Date(parseInt(endDate)),
        guests_count,
        userId: req.session.userId,
        houseId,
        status: 'в ожидании',
      });
    } catch {
      return [];
    }

    const disabledDates = await Booking.find({houseId});

    let tempDates: string[] = [];

    disabledDates.forEach(el => {
      let fromDate = moment(el.startDate);
      let toDate = moment(el.endDate);

      while (fromDate <= toDate) {
        let ld = fromDate.format('DD-MM-YY');
        tempDates.push(ld);
        fromDate = moment(fromDate).add(1, 'days');
      }
    });

    return tempDates;
  }

  @Mutation(() => HouseResponse)
  @UseMiddleware(isAuth)
  async createHouse(
    @Arg('input') input: HouseInput,
    @Ctx() {req}: MyContext
  ): Promise<HouseResponse> {
    let house;
    let pictureUrl: string[] = [];

    if (input.file) {
      pictureUrl = await processUpload(input.file, req.session.userId);
    } else {
      return {
        errors: [
          {
            field: 'file',
            message: 'Загрузите хотя бы 1 изображение',
          },
        ],
      };
    }

    house = await House.create({
      userId: req.session.userId,
      pictureUrl,
      ...input,
    }).save();

    return {house};
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async leaveReview(@Arg('options') options: ReviewInput, @Ctx() {req}: MyContext) {
    const {userId} = req.session;

    const houseId = options.houseId;
    const reviewEqual = await Review.findOne({where: {userId, houseId}});

    if (reviewEqual) {
      return false;
    } else {
      await Review.insert({
        ...options,
        userId,
      });
    }

    return true;
  }

  @Query(() => PaginatedHouses)
  async houses(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
    @Arg('housesById', () => Boolean, {nullable: true}) housesById: boolean,
    @Ctx() {req}: MyContext
  ): Promise<PaginatedHouses> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(House)
      .createQueryBuilder('h')
      // .addSelect(s => s.select('COUNT(*)').from('review', 're').where('re.houseId = h.id'), 'reviewCount')
      .innerJoinAndSelect('h.user', 'u', 'u.id = h.userId')
      .innerJoinAndSelect('h.room_type', 'rt', 'rt.id = h.room_typeId')
      .innerJoinAndSelect('h.house_type', 'ht', 'ht.id = h.house_typeId')
      .orderBy('h.createdAt', 'DESC')
      .take(realLimitPlusOne);
    // .addSelect("(SELECT COUNT(*) FROM review as re WHERE re.houseId = h.id)", "reviewCount")
    if (cursor) {
      qb.where('h.createdAt < :cursor', {cursor: new Date(parseInt(cursor))});
    }
    if (housesById) {
      qb.where('h.userId = :userId', {userId: req.session.userId});
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

    return {houses: houses.slice(0, realLimit), hasMore: houses.length === realLimitPlusOne};
  }

  @Query(() => House, {nullable: true})
  async house(@Arg('id', () => Int) id: number): Promise<House | undefined> {
    return await House.findOne(id, {relations: ['user', 'room_type', 'house_type']});
  }

  @Mutation(() => House, {nullable: true})
  @UseMiddleware(isAuth)
  async updateHouse(
    @Arg('id', () => Int) id: number,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() {req}: MyContext
  ): Promise<House | null | undefined> {
    await House.update({id, userId: req.session.userId}, {title, description});
    return await House.findOne({id, userId: req.session.userId});

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
  async deleteHouse(@Arg('id', () => Int) id: number, @Ctx() {req}: MyContext): Promise<boolean> {
    try {
      const [{pictureUrl}] = await House.find({id});
      await House.delete({id, userId: req.session.userId});
      await deleteHouseImages(pictureUrl, req.session.userId);
    } catch {
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBooking(@Arg('id', () => Int) id: number, @Ctx() {req}: MyContext): Promise<boolean> {
    try {
      await Booking.delete({userId: req.session.userId, id});
    } catch {
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async changeBookingStatus(
    @Arg('id', () => Int) id: number,
    @Arg('active', () => Int, {nullable: true}) active: number, // 1
    @Arg('finished', () => Int, {nullable: true}) finished: number // 2
  ): Promise<boolean> {
    if (active) {
      await Booking.update({id}, {status: 'активирован'});
    } else if (finished) {
      await Booking.update({id}, {status: 'завершен'});
    } else {
      return false;
    }

    return true;
  }
}
