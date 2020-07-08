import {
  cleanEnv, port
} from "envalid";

function validateEnvironment(): void {

  cleanEnv(process.env, {
    PORT: port(),
  });

}

export default validateEnvironment;
