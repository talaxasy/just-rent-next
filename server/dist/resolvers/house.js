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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseResolver = void 0;
const graphql_upload_1 = require("graphql-upload");
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const House_1 = require("../entities/House");
const Review_1 = require("../entities/Review");
const isAuth_1 = require("./../utils/middleware/isAuth");
const ErrorFields_1 = require("./types/ErrorFields");
const fs_1 = require("fs");
const processImage_1 = require("./../utils/processImage");
const deleteHouseImages_1 = require("./../utils/deleteHouseImages");
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
    createHouse(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let house;
            let pictureUrl = [];
            if (input.file) {
                pictureUrl = yield processImage_1.processUpload(input.file, req.session.userId);
            }
            else {
                return {
                    errors: [{
                            field: "file",
                            message: 'Загрузите хотя бы 1 изображение',
                        }]
                };
            }
            house = yield House_1.House.create(Object.assign({ userId: req.session.userId, pictureUrl }, input)).save();
            return { house };
        });
    }
    addHousePicture({ createReadStream, filename }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                createReadStream()
                    .pipe(fs_1.createWriteStream(`${__dirname}/../images/${filename}`, { autoClose: true }))
                    .on("finish", () => res(true))
                    .on("error", () => rej(false));
            });
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
    houses(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const realLimitPlusOne = realLimit + 1;
            const qb = typeorm_1.getConnection()
                .getRepository(House_1.House)
                .createQueryBuilder('h')
                .innerJoinAndSelect("h.user", "u", "u.id = h.userId")
                .innerJoinAndSelect("h.room_type", "rt", "rt.id = h.room_typeId")
                .innerJoinAndSelect("h.house_type", "ht", "ht.id = h.house_typeId")
                .orderBy('h.createdAt', 'DESC')
                .take(realLimitPlusOne);
            if (cursor) {
                qb.where('h.createdAt < :cursor', { cursor: new Date(parseInt(cursor)) });
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
    updateHouse(id, title, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield House_1.House.update({ id, userId: req.session.userId }, { title });
            return yield House_1.House.findOne({ id, userId: req.session.userId });
        });
    }
    deleteHouse(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [{ pictureUrl }] = yield House_1.House.find({ id });
                yield House_1.House.delete({ id, userId: req.session.userId });
                yield deleteHouseImages_1.deleteHouseImages(pictureUrl, req.session.userId);
                return true;
            }
            catch (_a) {
                return false;
            }
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
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House_1.House, Object]),
    __metadata("design:returntype", void 0)
], HouseResolver.prototype, "user", null);
__decorate([
    type_graphql_1.FieldResolver(() => Review_1.Review),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House_1.House, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "reviewCount", null);
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
    __param(0, type_graphql_1.Arg('picture', () => graphql_upload_1.GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "addHousePicture", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReviewInput, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "leaveReview", null);
__decorate([
    type_graphql_1.Query(() => PaginatedHouses),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('cursor', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
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
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "updateHouse", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HouseResolver.prototype, "deleteHouse", null);
HouseResolver = __decorate([
    type_graphql_1.Resolver(House_1.House)
], HouseResolver);
exports.HouseResolver = HouseResolver;
//# sourceMappingURL=house.js.map