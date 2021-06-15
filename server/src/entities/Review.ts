import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { House } from "./House";
import { User } from "./User";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @Field()
    @PrimaryColumn()
    houseId: number;

    @Field(() => House)
    @ManyToOne(() => House, house => house.reviews, {
        onDelete: 'CASCADE'
    })
    house: House;






    @Field()
    @Column('text')
    text!: string;

    @Field()
    @Column({ default: 0 })
    mark!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}