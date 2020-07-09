import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
class Post {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public author_id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

}

export default Post;
