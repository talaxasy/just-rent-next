import { GraphQLUpload } from 'graphql-upload';
import { Field, Int, ObjectType } from "type-graphql";
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, Double, JoinColumn } from 'typeorm';
import { HouseType } from "./HouseType";
import { Review } from "./Review";
import { RoomType } from "./RoomType";
import { User } from "./User";

@ObjectType()
@Entity()
export class House extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int, { nullable: true })
    reviewCount: number | null;

    @Field()
    @Column()
    title!: string; // Название

    @Field()
    @Column('text')
    description!: string; // Описание

    @Field()
    @Column()
    country!: string; // Страна

    @Field()
    @Column()
    street!: string; // Улица

    @Field()
    @Column()
    city!: string; // Город

    @Field()
    @Column()
    state!: string; // Штат или Регион

    @Field()
    @Column()
    apartment!: string; // Квартира

    @Field()
    @Column()
    zip!: string; // Почтовый индекс

    @Field()
    @Column({ default: 1 })
    bed_count!: number; // Кол-во кроватей

    @Field()
    @Column({ default: 1 })
    bedroom_count!: number; // Кол-во комнат

    @Field()
    @Column({ default: 1 })
    bathroom_count!: number; // Кол-во душевых

    @Field()
    @Column({ default: 1 })
    guests_count!: number; // Вместимость

    @Field(() => String)
    @Column('time')
    booking_before!: String; // Бронирование до 22:00

    @Field(() => String)
    @Column('time')
    availability_arrivals_start!: String; // Прибытие разрешается с ...

    @Field(() => String)
    @Column('time')
    availability_arrivals_end!: String; // Прибытие разрешается до ...

    @Field()
    @Column({ default: 1 }) // 1 любое и 0 определенное
    booking_can_advance_checker!: boolean; // Насколько заранее гости могут бранировать жильё

    @Field()
    @Column()
    booking_can_advance_time!: string; // Насколько заранее гости могут бранировать жильё

    @Field()
    @Column()
    booking_min!: number; // Сколько минимально могут жить люди в доме

    @Field()
    @Column()
    booking_max!: number; // Сколько максимально могут жить люди в доме

    @Field()
    @Column('double', { default: 0 })
    price!: number; // Цена

    @Field(() => [String]) // GraphQL
    @Column('simple-array') // SQL
    amenities!: string[]; // Удобства // Code TS

    @Field(() => [String])
    @Column('simple-array', { nullable: true })
    rules?: string[]; // Правила

    @Field(() => [String], { nullable: true })
    @Column('simple-array')
    safety_amenities?: string[]; // Удобства безопасности

    @Field(() => [String])
    @Column('simple-array', { nullable: true })
    pictureUrl: string[]; // Картинка дома

    @Field(() => Boolean)
    @Column('boolean', { default: false })
    disability!: boolean; // Пригодно ли для инвалидов?

    @Field(() => [String])
    @Column('simple-array')
    avalible_dates!: string[]; // Доступные даты

    @Field()
    @Column()
    address!: string; // Адрес в целом

    @Field()
    @Column('double precision')
    longitude: number; // Долгота

    @Field()
    @Column('double precision')
    latitude: number; // Широта

    @Field()
    @Column({ type: 'double', default: 0 })
    rating: number; // Рейтинг

    @Field()
    @Column()
    userId!: number; // Хозяин

    @Field()
    @Column()
    house_typeId!: number;

    @Field()
    @Column()
    room_typeId!: number; // Хозяин

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => HouseType)
    @ManyToOne(() => HouseType, house_type => house_type.houses) // FK от houseType
    @JoinColumn({ name: 'house_typeId' })
    house_type: HouseType; // Тип дома (Например: Дом или Квартира)

    @Field(() => RoomType)
    @ManyToOne(() => RoomType, room_type => room_type.houses) // FK от roomType
    @JoinColumn({ name: 'room_typeId' })
    room_type: RoomType; // Тип комнаты (Например: Жильё целиком или Отдельная комната)

    @Field(() => User)
    @ManyToOne(() => User, user => user.houses) // FK от User
    user: User;

    @OneToMany(() => Review, review => review.house) // FK для Review
    reviews: Review[];
}