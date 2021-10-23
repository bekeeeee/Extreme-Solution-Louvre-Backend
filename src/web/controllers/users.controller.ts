import { Jwt } from "@logic/dto/users";
import { CreateUserDto } from "@logic/dto/users/create-user.dto";
import { UsersService } from "@logic/services/users.service";
import { BaseHttpResponse } from "@web/lib/base-http-response";
import { ValidateRequestMiddleware } from "@web/middlewares/validate-request.middleware";

import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";

@controller("/api/v1/user")
export class UsersController {
  constructor(private readonly _service: UsersService) {}

  @httpPost("/", ValidateRequestMiddleware.with(CreateUserDto))
  async signup(req: Request, res: Response) {
    console.log("CreateUserDto", req.body);
    await this._service.findOneByEmailSignUp({ email: req.body.email });
    await this._service.findOneByUsernameSignup({
      username: req.body.username,
    });

    await this._service.findOneByPhoneNumberSignup({
      phoneNumber: req.body.phoneNumber,
    });
    const user = await this._service.create(req.body);
    const jwt = await Jwt.signToken(Jwt.from(req.body));
    req.session! = { jwt };
    user.password = "";
    const response = BaseHttpResponse.success(user);
    res.json(response);
  }
}
