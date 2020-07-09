import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 ⚙ Middlewares
//------------------------------------------------
import errorMiddleware, {
  pathNotFoundMiddleware
} from "./middlewares/error.middleware";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 ⚙ Middlewares
//------------------------------------------------

class App {

  public app: express.Application;
  public port: number;

  constructor(controllers) {

    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandlers();

  }

  private initializeMiddlewares() {

    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

  }

  private initializeErrorHandlers() {

    this.app.use(pathNotFoundMiddleware);
    this.app.use(errorMiddleware);

  }

  private initializeControllers(controllers) {

    controllers.forEach(controller => {

      this.app.use(`/`, controller.router);

    });

  }

  public listen(): void {

    this.app.listen(process.env.PORT, () => {

      console.log(`App is running on port ${process.env.PORT}`);

    });

  }

  public getServer(): express.Application {

    return this.app;

  }

}

export default App;
