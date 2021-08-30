import {createUserLoader} from './utils/createUserLoader';
import DataLoader from 'dataloader';
import {Redis} from 'ioredis';
import {Request, Response} from 'express';
import {Session} from 'express-session';
import {User} from './entities/User';
import {createReviewCountLoader} from './utils/createReviewCountLoader';

export interface CustomSessionData extends Session {
  userId: number;
  // You can add any additional data here.
}

export type MyContext = {
  req: Request & {session: {userId?: number}};
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  reviewLoader: ReturnType<typeof createReviewCountLoader>;
};
