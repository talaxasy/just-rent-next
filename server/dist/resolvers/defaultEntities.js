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
exports.DefaultEntities = void 0;
const Review_1 = require("./../entities/Review");
const DefaultRules_1 = require("./../entities/DefaultRules");
const DefaultAmenities_1 = require("./../entities/DefaultAmenities");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const HouseType_1 = require("./../entities/HouseType");
const RoomType_1 = require("./../entities/RoomType");
const SafetyAmeneties_1 = require("./../entities/SafetyAmeneties");
let DefaultEntities = class DefaultEntities {
    defaultHouseTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_1.getRepository(HouseType_1.HouseType)
                .createQueryBuilder("defaultHT")
                .getMany();
            return qb;
        });
    }
    safetyAmenities() {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_1.getRepository(SafetyAmeneties_1.SafetyAmeneties)
                .createQueryBuilder("safetyA")
                .getMany();
            return qb;
        });
    }
    defaultRoomTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_1.getRepository(RoomType_1.RoomType)
                .createQueryBuilder("defaultRT")
                .getMany();
            return qb;
        });
    }
    defaultAmenities() {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_1.getRepository(DefaultAmenities_1.DefaultAmenities)
                .createQueryBuilder("defaultA")
                .getMany();
            return qb;
        });
    }
    defaultRules() {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = yield typeorm_1.getRepository(DefaultRules_1.DefaultRules)
                .createQueryBuilder("defaultR")
                .getMany();
            return qb;
        });
    }
    reviews(houseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getRepository(Review_1.Review)
                .createQueryBuilder("reviews")
                .where('houseId = :houseId', { houseId })
                .getMany();
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [HouseType_1.HouseType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultEntities.prototype, "defaultHouseTypes", null);
__decorate([
    type_graphql_1.Query(() => [SafetyAmeneties_1.SafetyAmeneties]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultEntities.prototype, "safetyAmenities", null);
__decorate([
    type_graphql_1.Query(() => [RoomType_1.RoomType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultEntities.prototype, "defaultRoomTypes", null);
__decorate([
    type_graphql_1.Query(() => [DefaultAmenities_1.DefaultAmenities]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultEntities.prototype, "defaultAmenities", null);
__decorate([
    type_graphql_1.Query(() => [DefaultRules_1.DefaultRules]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultEntities.prototype, "defaultRules", null);
__decorate([
    type_graphql_1.Query(() => [Review_1.Review]),
    __param(0, type_graphql_1.Arg('houseId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DefaultEntities.prototype, "reviews", null);
DefaultEntities = __decorate([
    type_graphql_1.Resolver()
], DefaultEntities);
exports.DefaultEntities = DefaultEntities;
//# sourceMappingURL=defaultEntities.js.map