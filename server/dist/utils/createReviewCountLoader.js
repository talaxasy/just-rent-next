"use strict";
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
exports.createReviewCountLoader = void 0;
const Review_1 = require("./../entities/Review");
const dataloader_1 = __importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
const createReviewCountLoader = () => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield typeorm_1.getConnection()
        .getRepository(Review_1.Review)
        .createQueryBuilder('h')
        .where(`houseId IN(${keys})`)
        .getMany();
    const reviewIdsToReview = {};
    keys.map(key => {
        let counter = [];
        reviews.map(review => {
            if (review.houseId == key) {
                counter.push(review);
            }
        });
        reviewIdsToReview[key] = counter;
    });
    return keys.map(key => reviewIdsToReview[key]);
}));
exports.createReviewCountLoader = createReviewCountLoader;
//# sourceMappingURL=createReviewCountLoader.js.map