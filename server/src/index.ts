// Diffrent Packages
import 'reflect-metadata'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors'
import { createConnection } from 'typeorm';
import path from 'path';
import { graphqlUploadExpress } from 'graphql-upload';

// Redis
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';

//My Libs
import { UserResolver } from './resolvers/user';
import { DefaultEntities } from './resolvers/defaultEntities';
import { __prod__ } from './constants';
import { HouseResolver } from './resolvers/house';
import { MyContext } from './types';
import { COOKIE_NAME } from './constants';
import { House } from './entities/House';
import { User } from './entities/User';
import { Review } from './entities/Review';
import { HouseType } from './entities/HouseType';
import { RoomType } from './entities/RoomType';
import { DefaultAmenities } from './entities/DefaultAmenities';
import { SafetyAmeneties } from './entities/SafetyAmeneties';
import { DefaultRules } from './entities/DefaultRules';
import dayjs from 'dayjs';
import { createReviewCountLoader } from './utils/createReviewCountLoader';
import { createUserLoader } from './utils/createUserLoader';
import { Booking } from './entities/Booking';



const main = async () => {

    const conn = await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "troll233233",
        database: "justrentorm",
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
            Booking
        ]
    });


    //await conn.runMigrations();
    //await Review.delete({});
    //await House.delete({});

    const app = express();

    const RedisStore = connectRedis(session);

    const redis = new Redis(); // instead of redis()

    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));



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
                secure: __prod__ // Cookies only works in https
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
        context: ({ req, res }): MyContext => (
            {
                req,
                res,
                redis,
                userLoader: createUserLoader(),
                reviewLoader: createReviewCountLoader(),
            }
        ),
        uploads: false
    });


    apolloServer.applyMiddleware({ app, cors: false });

    app.use(express.static('public'));

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });

};


main().catch(err => {
    console.log(err);
});