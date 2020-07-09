import * as typeorm from "typeorm";

import AuthService from "./auth.service";

import {
  IToken
} from "../../interfaces/token.interface";

import {
  RegisterDTO
} from "./auth.dto";

import UserWithThatEmailAlreadyExistsException
  from "../../libraries/exceptions/UserWithThatEmailAlreadyExistsException";

(typeorm as any).getRepository = jest.fn();

describe(`🔐 Authentication Service`, () => {

  describe(`when registering a user`, () => {

    describe(`if the email already exists`, () => {

      it(`should throw an error`, async () => {

        const userData: RegisterDTO = {
          name: `Pivithuru`,
          email: `piveedj@gmail.com`,
          password: `ThinkLikeADog`,
        };

        (typeorm as any).getRepository.mockReturnValue({

          findOne: () => Promise.resolve(userData),

        });

        const authService = new AuthService();

        await expect(authService.register(userData))
          .rejects.toMatchObject(
            new UserWithThatEmailAlreadyExistsException(userData.email)
          );

      });

    });

    describe(`if the email does not exist`, () => {

      it(`should not throw an error`, async () => {

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

        const authService = new AuthService();

        await expect(authService.register(userData))
          .resolves.toBeDefined();

      });

    });

  });

});

describe(`when creating a cookie 🍪`, () => {

  const token: IToken = {
    token: `SampleToken`,
    expiresIn: 1,
  };

  it(`should return a string`, () => {

    const authService = new AuthService();

    expect(typeof authService.createCookie(token))
      .toEqual(`string`);

  });

});
