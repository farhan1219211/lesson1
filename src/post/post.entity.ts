import { Comments } from "src/comments/comments.entity";
import { Like } from "src/like/like.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    post_id: number

    @Column()
    title: string;

    @Column()
    content: string

    @ManyToOne(() => User, user => user.posts)
    author: User;

    @OneToMany(() => Comments, comment => comment.post)
    comments: Comments[];

    @OneToMany(() => Like, like => like.post)
    likes: Like[];

   
}