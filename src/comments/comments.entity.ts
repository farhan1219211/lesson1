import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments{
    @PrimaryGeneratedColumn()
    comment_id: number

    @Column()
    content: string

    @ManyToOne(()=> Post)
    @JoinColumn({name: 'post_id'})
    post: Post;

    @ManyToOne(()=> User)
    @JoinColumn({name: 'user_id'})
    author: User
}