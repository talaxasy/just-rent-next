import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { House } from "./House";
import { User } from "./User";

@ObjectType()
@Entity()
export class Booking extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    endDate: Date;

    @Field(() => String)
    @Column()
    startDate: Date;

    @Field()
    @Column()
    guests_count: number;

    @Field()
    @Column({ nullable: true })
    status: string;

    @Field()
    @Column()
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.booking)
    user: User;

    @Field()
    @Column()
    houseId: number;

    @Field(() => House)
    @ManyToOne(() => House, house => house.booking, {
        onDelete: 'CASCADE'
    })
    house: House;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}