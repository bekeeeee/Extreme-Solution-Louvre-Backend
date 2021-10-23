import { UsersService } from "@logic/services/users.service";

import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";



@controller("/api/v1/user")
export class UsersController {
  constructor(private readonly _service: UsersService) {}

  @httpGet("/")
  async getAllUsers(req: Request, res: Response) {
    const users = await this._service.all();

    res.json(users);
  }
}
