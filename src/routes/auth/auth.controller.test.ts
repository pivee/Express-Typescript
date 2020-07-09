import * as request from "supertest";

import App from "../../App";

import AuthController from "./auth.controller";

import * as typeorm from "typeorm";

import {
  RegisterDTO
} from "./auth.dto";

(typeorm as any).getRepository = jest.fn();

describe(`🔐 Authentication Controller`, () => {

  describe(`POST /auth/register`, () => {

    describe(`if the email does not exist`, () => {

      it(`should return a response with Set-Cookie header with Authorization token`, () => {

        const userData: RegisterDTO = {
          name: `Pivithuru`,
          email: `piveedj@gmail.com`,
          password: `ThinkLikeADog`,
        };

        process.env.JWT_SECRET = `jwt_secret`;

        (typeorm as any).getRepository.mockReturnValue({

          findOne: () => Promise.resolve(null),
          create: () => ({
            ...userData,
            id: 1,
          }),
          save: () => Promise.resolve(),

        });

        const authController = new AuthController();

        const app = new App([
          authController,
        ]);

        return request(app.getServer())
          .post(`${authController.path}/register`)
          .send(userData)
          .expect(
            `Set-Cookie`,
            /^Authorization=.+/
          );

      });

    });

  });

});
