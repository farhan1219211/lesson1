import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like{
    @PrimaryGeneratedColumn()
    like_id: number

    @Column()
    content: string

    @ManyToMany(()=>Post)
    @JoinTable()
    post: Post[]

    @ManyToMany(()=> User)
    @JoinTable()
    likedBy: User[];

}