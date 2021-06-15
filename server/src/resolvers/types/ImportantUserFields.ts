import { Field, InputType } from "type-graphql";


@InputType()
export class ImportantUserFields {
    @Field()
    username: string;
    @Field()
    password: string;
    @Field()
    email: string;
}

