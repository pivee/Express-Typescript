import {
  ConnectionOptions
} from "typeorm";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 📦 Entities
//------------------------------------------------
import Post from "./entities/post.entity";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 📦 Entities
//------------------------------------------------

const config: ConnectionOptions = {
  type: `postgres`,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Post,
  ],
  synchronize: true,
};

export default config;
