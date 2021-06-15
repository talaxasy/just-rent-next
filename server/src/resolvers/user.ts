import argon2 from 'argon2';
import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { v4 } from 'uuid';
import { User } from '../entities/User';
import { MyContext } from "../types";
import { sendEmail } from '../utils/sendEmail';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from './../constants';
import { FieldError } from "./types/ErrorFields";
import { ImportantUserFields } from './types/ImportantUserFields';





@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}


@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(
        @Root() user: User,
        @Ctx() { req }: MyContext
    ) {
        //this is the current user and its ok to show him his own email
        if (req.session.userId === user.id) {
            return user.email;
        }
        // current user wants to see someone else's email
        return '';
    }

    // Change the password
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { redis, req }: MyContext
    ): Promise<UserResponse> {

        // Password checker
        if (newPassword.length <= 3) {
            return {
                errors: [{
                    field: "newPassword",
                    message: 'Пароль должен быть не меньше 4 символов'
                }]
            };
        }

        const redisKey = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(redisKey);

        if (!userId) {
            return {
                errors: [{
                    field: "token",
                    message: 'Время изменения пароля закончилось'
                }]
            };
        }

        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum);

        if (!user) {
            return {
                errors: [{
                    field: "token",
                    message: 'Пользователя больше не существует'
                }]
            };
        }


        await User.update({ id: userIdNum }, { password: await argon2.hash(newPassword) });
        await redis.del(redisKey);

        // Log In user after change a password
        req.session.userId = user.id;

        return { user };
    }


    // Forgot the password
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return true;
        }

        const token = v4();
        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 60 * 60 * 3
        ); // 3 hours

        await sendEmail(
            email,
            `
            Сброс пароля<br/>
            <a href="http://localhost:3000/change-password/${token}/">reset password</a>
            `
        );
        return true;
    }

    // Coockie passing
    @Query(() => User, { nullable: true })
    me(
        @Ctx() { req }: MyContext
    ) {

        // Если пользователь не вошёл
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
    }

    // REGISTER
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: ImportantUserFields,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {


        // Username checker
        if (options.username.length <= 4) {
            return {
                errors: [{
                    field: "username",
                    message: 'Длинна логина не должна быть меньше 5 символов'
                }]
            }
        }
        const compareUsername = await User.findOne({ where: { username: options.username } })
        if (compareUsername) {
            return {
                errors: [{
                    field: "username",
                    message: 'Такой пользователь уже существует'
                }]
            }
        }

        // E-mail checker
        if (!options.email.includes('@') && options.email.length <= 6) {
            return {
                errors: [{
                    field: "email",
                    message: 'Некорректная почта'
                }]
            }
        }
        const compareEmailUser = await User.findOne({ where: { email: options.email } })
        if (compareEmailUser) {
            return {
                errors: [{
                    field: "email",
                    message: 'Такая почта уже есть в базе'
                }]
            }
        }

        // Password checker
        if (options.password.length <= 3) {
            return {
                errors: [{
                    field: "password",
                    message: 'Пароль должен быть не меньше 4 символов'
                }]
            }
        }


        const hashedPassword = await argon2.hash(options.password);
        let user;

        try {
            user = await User.create({ username: options.username, password: hashedPassword, email: options.email }).save();
        } catch (error) {
            return {
                errors: [{
                    field: "password",
                    message: error.ToString(),
                }]
            }
        }

        //Записать в хранилище куки пользователя
        req.session.userId = user.id;

        return { user };
    }


    // LOGIN 
    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes('@')
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } });
        if (!user) {
            return {
                errors: [{
                    field: "usernameOrEmail",
                    message: 'Такого пользователя не существует'
                }]
            }
        }

        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [{
                    field: "password",
                    message: 'Неправильный пароль'
                }]
            }
        }
        req.session.userId = user.id;

        return { user };
    }

    // LOGOUT 
    @Mutation(() => Boolean)
    logout(
        @Ctx() { req, res }: MyContext
    ) {

        return new Promise(resolve => req.session.destroy(err => {
            res.clearCookie(COOKIE_NAME);
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        }));

    }
}