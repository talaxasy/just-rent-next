import { Booking } from './Booking';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Field, ObjectType } from "type-graphql";
import { House } from './House';
import { Review } from './Review';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column({ default: '' })
    firstName!: string;

    @Field()
    @Column({ default: '' })
    secondName!: string;

    @Field(() => String)
    @Column({ default: '' })
    description: string;

    @Field(() => String)
    @Column({ default: '' })
    phone: string;

    @Field()
    @Column({ default: 0 })
    gender: number; // 1 - м, 2 - ж

    @Field(() => String)
    @Column({ default: null })
    birthDay: Date; // 1 - м, 2 - ж

    @Column()
    password!: string;

    @OneToMany(() => House, house => house.user) // Передача инфы к user в House
    houses: House[];

    @OneToMany(() => Review, review => review.user) // Передача инфы к user в Review
    reviews: Review[];

    @OneToMany(() => Booking, booking => booking.user) // Передача инфы user в Booking
    booking: Booking[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}