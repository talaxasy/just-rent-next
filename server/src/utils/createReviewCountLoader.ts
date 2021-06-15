import { Review } from './../entities/Review';
import DataLoader from 'dataloader';
import { getConnection } from 'typeorm';
export const createReviewCountLoader = () => new DataLoader<number, Review[]>(async keys => {
    const reviews = await getConnection()
        .getRepository(Review)
        .createQueryBuilder('h')
        .where(`houseId IN(${keys as number[]})`)
        .getMany()

    const reviewIdsToReview: Record<number, Review[]> = {};

    keys.map(key => {
        let counter: Array<Review> = [];
        reviews.map(review => {
            if (review.houseId == key) {
                counter.push(review);
            }
        })
        reviewIdsToReview[key] = counter;
    });
    return keys.map(key => reviewIdsToReview[key]);
});