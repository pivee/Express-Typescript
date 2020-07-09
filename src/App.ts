import * as express from "express";
import * as bodyParser from "body-parser";

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

  constructor(controllers, port: number) {

    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandlers();

  }

  private initializeMiddlewares() {

    this.app.use(bodyParser.json());

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

    this.app.listen(this.port, () => {

      console.log(`App is running on port ${this.port}`);

    });

  }

}

export default App;
