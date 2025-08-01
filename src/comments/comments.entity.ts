import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments{
    @PrimaryGeneratedColumn()
    comment_id: number

    @Column()
    content: string

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @ManyToOne(() => User, user => user.comments)
    author: User;
}