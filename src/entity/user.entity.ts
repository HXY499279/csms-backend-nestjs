import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    nickName: string;

    @Column()
    description: string;

    @Column()
    avatar: string;

    @Column()
    column: string;

    @Column()
    password: string;

    @Column()
    createdAt: number;

}

