import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { Post } from "src/post/post.entity";
import { Like } from "src/like/like.entity";
import { Comments } from "src/comments/comments.entity";

// Two possible roles (admin, user)
export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

// Two possible status (active, inactive)
export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    name: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({type: "enum", enum: UserRole})
    role: UserRole;

    @Column({type: "enum", enum: UserStatus})
    status: UserStatus;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @OneToMany(() => Comments, comment => comment.author)
    comments: Comment[];

    @OneToMany(() => Like, like => like.likedBy)
    likes: Like[];
}