import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export default class Post {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public author: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

}
