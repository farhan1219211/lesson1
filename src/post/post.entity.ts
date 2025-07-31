import { Like } from "src/like/like.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column()
    title: string;

    @Column()
    content: string

    @OneToOne(()=>User)
    @JoinColumn({name: 'user_id'})
    author: User;

   
}