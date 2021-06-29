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
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const Booking_1 = require("./Booking");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const HouseType_1 = require("./HouseType");
const Review_1 = require("./Review");
const RoomType_1 = require("./RoomType");
const User_1 = require("./User");
let House = class House extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], House.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], House.prototype, "reviewCount", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], House.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "country", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "street", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "state", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "apartment", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "zip", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], House.prototype, "bed_count", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], House.prototype, "bedroom_count", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], House.prototype, "bathroom_count", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], House.prototype, "guests_count", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column('time'),
    __metadata("design:type", String)
], House.prototype, "booking_before", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column('time'),
    __metadata("design:type", String)
], House.prototype, "availability_arrivals_start", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column('time'),
    __metadata("design:type", String)
], House.prototype, "availability_arrivals_end", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Boolean)
], House.prototype, "booking_can_advance_checker", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "booking_can_advance_time", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], House.prototype, "booking_min", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], House.prototype, "booking_max", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('double', { default: 0 }),
    __metadata("design:type", Number)
], House.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], House.prototype, "amenities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], House.prototype, "rules", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], House.prototype, "safety_amenities", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], House.prototype, "pictureUrl", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "disability", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], House.prototype, "avalible_dates", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], House.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('double precision'),
    __metadata("design:type", Number)
], House.prototype, "longitude", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('double precision'),
    __metadata("design:type", Number)
], House.prototype, "latitude", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'double', default: 0 }),
    __metadata("design:type", Number)
], House.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], House.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], House.prototype, "house_typeId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], House.prototype, "room_typeId", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], House.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], House.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => HouseType_1.HouseType),
    typeorm_1.ManyToOne(() => HouseType_1.HouseType, house_type => house_type.houses),
    typeorm_1.JoinColumn({ name: 'house_typeId' }),
    __metadata("design:type", HouseType_1.HouseType)
], House.prototype, "house_type", void 0);
__decorate([
    type_graphql_1.Field(() => RoomType_1.RoomType),
    typeorm_1.ManyToOne(() => RoomType_1.RoomType, room_type => room_type.houses),
    typeorm_1.JoinColumn({ name: 'room_typeId' }),
    __metadata("design:type", RoomType_1.RoomType)
], House.prototype, "room_type", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.houses),
    __metadata("design:type", User_1.User)
], House.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Review_1.Review, review => review.house),
    __metadata("design:type", Array)
], House.prototype, "reviews", void 0);
__decorate([
    typeorm_1.OneToMany(() => Booking_1.Booking, booking => booking.house),
    __metadata("design:type", Array)
], House.prototype, "booking", void 0);
House = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], House);
exports.House = House;
//# sourceMappingURL=House.js.map