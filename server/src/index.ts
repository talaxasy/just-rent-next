// Diffrent Packages
import {ApolloServer} from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import {graphqlUploadExpress} from 'graphql-upload';
import chalkAnimation from 'chalk-animation';
// Redis
import Redis from 'ioredis';
import path from 'path';
import 'reflect-metadata';
import {buildSchema} from 'type-graphql';
import {createConnection} from 'typeorm';
import {COOKIE_NAME, __prod__} from './constants';
import {Booking} from './entities/Booking';
import {DefaultAmenities} from './entities/DefaultAmenities';
import {DefaultRules} from './entities/DefaultRules';
import {House} from './entities/House';
import {HouseType} from './entities/HouseType';
import {Review} from './entities/Review';
import {RoomType} from './entities/RoomType';
import {SafetyAmeneties} from './entities/SafetyAmeneties';
import {User} from './entities/User';
import {DefaultEntities} from './resolvers/defaultEntities';
import {HouseResolver} from './resolvers/house';
//My Libs
import {UserResolver} from './resolvers/user';
import {MyContext} from './types';
import {createReviewCountLoader} from './utils/createReviewCountLoader';
import {createUserLoader} from './utils/createUserLoader';

const main = async () => {
  const conn = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'troll233233',
    database: 'justrentorm',
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
    entities: [
      Review,
      House,
      User,
      HouseType,
      RoomType,
      DefaultAmenities,
      DefaultRules,
      SafetyAmeneties,
      Booking,
    ],
  });

  //await conn.runMigrations();
  //await Review.delete({});
  //await House.delete({});

  const app = express();

  const RedisStore = connectRedis(session);

  const redis = new Redis(); // instead of redis()

  app.use(graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}));

  app.use(
    cors({
      origin: 'http://localhost:3005',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 3, // 3 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__, // Cookies only works in https
      },
      saveUninitialized: false,
      secret: 'jkjgvnsnsdkjnkjuvbbuweovevalkdv',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HouseResolver, UserResolver, DefaultEntities],
      validate: false,
    }),
    context: ({req, res}): MyContext => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      reviewLoader: createReviewCountLoader(),
    }),
    uploads: false,
  });

  apolloServer.applyMiddleware({app, cors: false});

  app.use(express.static('public'));

  app.listen(4000, () => {
    chalkAnimation.rainbow('server started on localhost:4000');
  });
};

main().catch(err => {
  console.log(err);
});
