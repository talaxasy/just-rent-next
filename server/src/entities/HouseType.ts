import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { House } from "./House";

@ObjectType()
@Entity()
export class HouseType extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ nullable: true, default: '' })
    description: string;

    @OneToMany(() => House, house => house.house_type)
    houses: House[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}