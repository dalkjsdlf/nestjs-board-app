import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;

    @OneToMany(Type => Board, Board => Board.user, {eager : false})
    boards : Board[]
}