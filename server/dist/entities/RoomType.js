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
exports.RoomType = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const House_1 = require("./House");
let RoomType = class RoomType extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoomType.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], RoomType.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true, default: '' }),
    __metadata("design:type", String)
], RoomType.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => House_1.House, house => house.room_type),
    __metadata("design:type", Array)
], RoomType.prototype, "houses", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], RoomType.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], RoomType.prototype, "updatedAt", void 0);
RoomType = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], RoomType);
exports.RoomType = RoomType;
//# sourceMappingURL=RoomType.js.map