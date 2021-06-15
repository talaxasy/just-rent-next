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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const graphql_upload_1 = require("graphql-upload");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const user_1 = require("./resolvers/user");
const defaultEntities_1 = require("./resolvers/defaultEntities");
const constants_1 = require("./constants");
const house_1 = require("./resolvers/house");
const constants_2 = require("./constants");
const House_1 = require("./entities/House");
const User_1 = require("./entities/User");
const Review_1 = require("./entities/Review");
const HouseType_1 = require("./entities/HouseType");
const RoomType_1 = require("./entities/RoomType");
const DefaultAmenities_1 = require("./entities/DefaultAmenities");
const SafetyAmeneties_1 = require("./entities/SafetyAmeneties");
const DefaultRules_1 = require("./entities/DefaultRules");
const createReviewCountLoader_1 = require("./utils/createReviewCountLoader");
const createUserLoader_1 = require("./utils/createUserLoader");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "troll233233",
        database: "justrentorm",
        logging: true,
        migrations: [path_1.default.join(__dirname, './migrations/*')],
        synchronize: true,
        entities: [
            Review_1.Review,
            House_1.House,
            User_1.User,
            HouseType_1.HouseType,
            RoomType_1.RoomType,
            DefaultAmenities_1.DefaultAmenities,
            DefaultRules_1.DefaultRules,
            SafetyAmeneties_1.SafetyAmeneties
        ]
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(express_session_1.default({
        name: constants_2.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 3,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__
        },
        saveUninitialized: false,
        secret: 'jkjgvnsnsdkjnkjuvbbuweovevalkdv',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [house_1.HouseResolver, user_1.UserResolver, defaultEntities_1.DefaultEntities],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader_1.createUserLoader(),
            reviewLoader: createReviewCountLoader_1.createReviewCountLoader(),
        }),
        uploads: false
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.use(express_1.default.static('public'));
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
});
main().catch(err => {
    console.log(err);
});
//# sourceMappingURL=index.js.map