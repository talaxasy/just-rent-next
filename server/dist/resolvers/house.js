"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseResolver = void 0;
const graphql_upload_1 = require("graphql-upload");
const moment_1 = __importDefault(require("moment"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Booking_1 = require("../entities/Booking");
const House_1 = require("../entities/House");
const Review_1 = require("../entities/Review");
const User_1 = require("../entities/User");
const deleteHouseImages_1 = require("./../utils/deleteHouseImages");
const isAuth_1 = require("./../utils/middleware/isAuth");
const processImage_1 = require("./../utils/processImage");
const ErrorFields_1 = require("./types/ErrorFields");
let ReviewInput = class ReviewInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ReviewInput.prototype, "houseId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ReviewInput.prototype, "mark", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReviewInput.prototype, "text", void 0);
ReviewInput = __decorate([
    type_graphql_1.InputType()
], ReviewInput);
let HouseResponse = class HouseResponse {
};
__decorate([
    type_graphql_1.Field(() => [ErrorFields_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], HouseResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => House_1.House, { nullable: true }),
    __metadata("design:type", House_1.House)
], HouseResponse.prototype, "house", void 0);
HouseResponse = __decorate([
    type_graphql_1.ObjectType()
], HouseResponse);
let SearchInput = class SearchInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SearchInput.prototype, "country", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SearchInput.prototype, "street", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SearchInput.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SearchInput.prototype, "state", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SearchInput.prototype, "apartment", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SearchInput.prototype, "bed_count", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SearchInput.prototype, "guests_count", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], SearchInput.prototype, "startDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SearchInput.prototype, "endDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SearchInput.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SearchInput.prototype, "lat", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SearchInput.prototype, "lng", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SearchInput.prototype, "rating", void 0);
SearchInput = __decorate([
    type_graphql_1.InputType()
], SearchInput);
let HouseInput = class HouseInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "country", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "street", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "state", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "apartment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "zip", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "bed_count", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "bedroom_count", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "bathroom_count", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "guests_count", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], HouseInput.prototype, "booking_can_advance_checker", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "booking_can_advance_time", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "booking_min", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "booking_max", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], HouseInput.prototype, "amenities", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], HouseInput.prototype, "rules", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], HouseInput.prototype, "safety_amenities", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], HouseInput.prototype, "disability", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], HouseInput.prototype, "avalible_dates", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "longitude", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "booking_before", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "availability_arrivals_start", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HouseInput.prototype, "availability_arrivals_end", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "latitude", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], HouseInput.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "house_typeId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], HouseInput.prototype, "room_typeId", void 0);
__decorate([
    type_graphql_1.Field(() => [graphql_upload_1.GraphQLUpload], { nullable: true }),
    __metadata("design:type", Object)
], HouseInput.prototype, "file", void 0);
HouseInput = __decorate([
    type_graphql_1.InputType()
], HouseInput);
let PaginatedHouses = class PaginatedHouses {
};
__decorate([
    type_graphql_1.Field(() => [House_1.House]),
    __metadata("design:type", Array)
], PaginatedHouses.prototype, "houses", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedHouses.prototype, "hasMore", void 0);
PaginatedHouses = __decorate([
    type_graphql_1.ObjectType()
], PaginatedHouses);
let HouseResolver = class HouseResolver {
    textSnippet(root) {
        return root;
    }
    user(house, { userLoader }) {
        return userLoader.load(house.userId);
    }
    reviewCount(house, { reviewLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield reviewLoader.load(house.id);
            return review.length;
        });
    }
    searchListings({ guests_count, city, country, street, state }) {
        return __awaiter(this, void 0, void 0, function* () {
            let listing = typeorm_1.getConnection().getRepository(House_1.House).createQueryBuilder('h');
            let step1 = null;
            if (city && state && street && country && guests_count) {
                step1 = yield House_1.House.find({
                    where: { city, state, street, country, guests_count: typeorm_1.MoreThanOrEqual(guests_count) },
                });
            }
            let step2 = null;
            if (city && state && street && guests_count) {
                step2 = yield House_1.House.find({
                    where: { city, state, street, guests_count: typeorm_1.MoreThanOrEqual(guests_count) },
                });
            }
            let step3 = null;
            if (city && state && guests_count) {
                step3 = yield House_1.House.find({ where: { city, state, guests_count: typeorm_1.MoreThanOrEqual(guests_count) } });
            }
            let step4 = null;
            if (street && state && guests_count) {
                step4 = yield House_1.House.find({
                    where: { street, state, guests_count: typeorm_1.MoreThanOrEqual(guests_count) },
                });
            }
            let step5 = null;
            if (state && guests_count) {
                step5 = yield House_1.House.find({ where: { state, guests_count: typeorm_1.MoreThanOrEqual(guests_count) } });
            }
            let step6 = null;
            if (street && guests_count) {
                step6 = yield House_1.House.find({ where: { street, guests_count: typeorm_1.MoreThanOrEqual(guests_count) } });
            }
            let step7 = null;
            if (city && guests_count) {
                step7 = yield House_1.House.find({ where: { city, guests_count: typeorm_1.MoreThanOrEqual(guests_count) } });
            }
            let step8 = null;
            if (country && guests_count) {
                step8 = yield House_1.House.find({ where: { country, guests_count: typeorm_1.MoreThanOrEqual(guests_count) } });
            }
            if (step1 === null || step1 === void 0 ? void 0 : step1.length) {
                return step1;
            }
            if (step2 === null || step2 === void 0 ? void 0 : step2.length) {
                return step2;
            }
            if (step3 === null || step3 === void 0 ? void 0 : step3.length) {
                return step3;
            }
            if (step4 === null || step4 === void 0 ? void 0 : step4.length) {
                return step4;
            }
            if (step5 === null || step5 === void 0 ? void 0 : step5.length) {
                return step5;
            }
            if (step6 === null || step6 === void 0 ? void 0 : step6.length) {
                return step6;
            }
            if (step7 === null || step7 === void 0 ? void 0 : step7.length) {
                return step7;
            }
            if (step8 === null || step8 === void 0 ? void 0 : step8.length) {
                return step8;
            }
            return undefined;
        });
    }
    getCustomerBookings(finished, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = typeorm_1.getConnection()
                .getRepository(Booking_1.Booking)
                .createQueryBuilder('b')
                .innerJoinAndSelect('b.user', 'u', 'u.id = b.userId')
                .innerJoinAndSelect('b.house', 'h', 'h.id = b.houseId')
                .orderBy('h.createdAt', 'DESC')
                .where('b.userId = :userId', { userId: req.session.userId });
            if (!finished) {
                qb.andWhere(`b.status != 'завершен'`);
            }
            else {
                qb.andWhere(`b.status = 'завершен'`);
            }
            return yield qb.getMany();
        });
    }
    getAdminBookings(finished, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminHouses = yield House_1.House.find({ userId: req.session.userId });
            if (!adminHouses.length) {
                return undefined;
            }
            const houseIds = adminHouses.map(el => {
                return el.id;
            });
            if (!houseIds.length) {
                return undefined;
            }
            const bookingList = typeorm_1.getConnection()
                .getRepository(Booking_1.Booking)
                .createQueryBuilder('b')
                .innerJoinAndSelect('b.user', 'u', 'u.id = b.userId')
                .innerJoinAndSelect('b.house', 'h', 'h.id = b.houseId')
                .orderBy('h.createdAt', 'DESC')
                .where(`houseId IN(${houseIds})`);
            if (!finished) {
                bookingList.andWhere(`b.status != 'завершен'`);
            }
            else {
                bookingList.andWhere(`b.status = 'завершен'`);
            }
            return yield bookingList.getMany();
        });
    }
    getBookings(houseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const disabledDates = yield Booking_1.Booking.find({ houseId, status: typeorm_1.Not('завершен') });
            let tempDates = [];
            disabledDates.forEach(el => {
                let fromDate = moment_1.default(el.startDate);
                let toDate = moment_1.default(el.endDate);
                while (fromDate <= toDate) {
                    let ld = fromDate.format('DD-MM-YY');
                    tempDates.push(ld);
                    fromDate = moment_1.default(fromDate).add(1, 'days');
                }
            });
            return tempDates;
        });
    }
    doBooking(startDate, endDate, guests_count, houseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Booking_1.Booking.insert({
                    startDate: new Date(parseInt(startDate)),
                    endDate: new Date(parseInt(endDate)),
                    guests_count,
                    userId: req.session.userId,
                    houseId,
                    status: 'в ожидании',
                });
            }
            catch (_a) {
                return [];
            }
            const disabledDates = yield Booking_1.Booking.find({ houseId });
            let tempDates = [];
            disabledDates.forEach(el => {
                let fromDate = moment_1.default(el.startDate);
                let toDate = moment_1.default(el.endDate);
                while (fromDate <= toDate) {
                    let ld = fromDate.format('DD-MM-YY');
                    tempDates.push(ld);
                    fromDate = moment_1.default(fromDate).add(1, 'days');
                }
            });
            return tempDates;
        });
    }
    createHouse(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let house;
            let pictureUrl = [];
            if (input.file) {
                pictureUrl = yield processImage_1.processUpload(input.file, req.session.userId);
            }
            else {
                return {
                    errors: [
                        {
                            field: 'file',
                            message: 'Загрузите хотя бы 1 изображение',
                        },
                    ],
                };
            }
            house = yield House_1.House.create(Object.assign({ userId: req.session.userId, pictureUrl }, input)).save();
            return { house };
        });
    }
    leaveReview(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const houseId = options.houseId;
            const reviewEqual = yield Review_1.Review.findOne({ where: { userId, houseId } });
            if (reviewEqual) {
                return false;
            }
            else {
                yield Review_1.Review.insert(Object.assign(Object.assign({}, options), { userId }));
            }
            return true;
        });
    }
    houses(limit, cursor, housesById, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const realLimitPlusOne = realLimit + 1;
            const qb = typeorm_1.getConnection()
                .getRepository(House_1.House)
                .createQueryBuilder('h')
                .innerJoinAndSelect('h.user', 'u', 'u.id = h.userId')
                .innerJoinAndSelect('h.room_type', 'rt', 'rt.id = h.room_typeId')
                .innerJoinAndSelect('h.house_type', 'ht', 'ht.id = h.house_typeId')
                .orderBy('h.createdAt', 'DESC')
                .take(realLimitPlusOne);
            if (cursor) {
                qb.where('h.createdAt < :cursor', { cursor: new Date(parseInt(cursor)) });
            }
            if (housesById) {
                qb.where('h.userId = :userId', { userId: req.session.userId });
            }
            const houses = yield qb.getMany();
            return { houses: houses.slice(0, realLimit), hasMore: houses.length === realLimitPlusOne };
        });
    }
    house(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield House_1.House.findOne(id, { relations: ['user', 'room_type', 'house_type'] });
        });
    }
    updateHouse(id, title, description, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield House_1.House.update({ id, userId: req.session.userId }, { title, description });
            return yield House_1.House.findOne({ id, userId: req.session.userId });
        });
    }
    deleteHouse(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [{ pictureUrl }] = yield House_1.House.find({ id });
                yield House_1.House.delete({ id, userId: req.session.userId });
                yield deleteHouseImages_1.deleteHouseImages(pictureUrl, req.session.userId);
            }
            catch (_a) {
                return false;
            }
            return true;
        });
    }
    deleteBooking(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Booking_1.Booking.delete({ userId: req.session.userId, id });
            }
            catch (_a) {
                return false;
            }
            return true;
        });
    }
    changeBookingStatus(id, active, finished) {
        return __awaiter(this, void 0, void 0, function* () {
            if (active) {
                yield Booking_1.Booking.update({ id }, { status: 'активирован' });
            }
            else if (finished) {
                yield Booking_1.Booking.update({ id }, { status: 'завершен' });
            }
            else {
                return false;
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House_1.House]),
    __metadata("design:returntype", void 0)
], HouseResolver.prototype, "textSnippet", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House_1.House, Object]),
    __metadata("design:returntype", void 0)
], HouseResolver.prototype, "user", null);
__decorate([
    type_graphql_1.FieldResolver(() => Review_1.Review),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House_1.House, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "reviewCount", null);
__decorate([
    type_graphql_1.Query(() => [House_1.House], { nullable: true }),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchInput]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "searchListings", null);
__decorate([
    type_graphql_1.Query(() => [Booking_1.Booking], { nullable: true }),
    __param(0, type_graphql_1.Arg('finished', () => Boolean, { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "getCustomerBookings", null);
__decorate([
    type_graphql_1.Query(() => [Booking_1.Booking], { nullable: true }),
    __param(0, type_graphql_1.Arg('finished', () => Boolean, { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "getAdminBookings", null);
__decorate([
    type_graphql_1.Query(() => [String]),
    __param(0, type_graphql_1.Arg('houseId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "getBookings", null);
__decorate([
    type_graphql_1.Mutation(() => [String]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('startDate', () => String)),
    __param(1, type_graphql_1.Arg('endDate', () => String)),
    __param(2, type_graphql_1.Arg('guests_count', () => type_graphql_1.Int)),
    __param(3, type_graphql_1.Arg('houseId', () => type_graphql_1.Int)),
    __param(4, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "doBooking", null);
__decorate([
    type_graphql_1.Mutation(() => HouseResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('input')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HouseInput, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "createHouse", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('options')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReviewInput, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "leaveReview", null);
__decorate([
    type_graphql_1.Query(() => PaginatedHouses),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('cursor', () => String, { nullable: true })),
    __param(2, type_graphql_1.Arg('housesById', () => Boolean, { nullable: true })),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Boolean, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "houses", null);
__decorate([
    type_graphql_1.Query(() => House_1.House, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "house", null);
__decorate([
    type_graphql_1.Mutation(() => House_1.House, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('title')),
    __param(2, type_graphql_1.Arg('description')),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "updateHouse", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "deleteHouse", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "deleteBooking", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('active', () => type_graphql_1.Int, { nullable: true })),
    __param(2, type_graphql_1.Arg('finished', () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "changeBookingStatus", null);
HouseResolver = __decorate([
    type_graphql_1.Resolver(House_1.House)
], HouseResolver);
exports.HouseResolver = HouseResolver;
//# sourceMappingURL=house.js.map