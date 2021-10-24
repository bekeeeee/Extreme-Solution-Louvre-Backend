import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { ArtsService } from "@logic/services/arts.service";
import { BaseHttpResponse } from "@web/lib/base-http-response";
import { CurrentUserMiddleware } from "@web/middlewares/current-user.middleware";
import { AuthorizedToAdmin } from "@web/middlewares/Authorized-to-admin";
import { ValidateRequestMiddleware } from "@web/middlewares/validate-request.middleware";
import { CreateArtDto } from "@logic/dto/arts";

@controller("/api/v1/art")
export class ArtsController {
  constructor(private readonly _service: ArtsService) {}
  @httpPost(
    "/",
    CurrentUserMiddleware,
    AuthorizedToAdmin,
    ValidateRequestMiddleware.with(CreateArtDto)
  )
  async store(req: Request, res: Response) {
    console.log("currentUser", req.currentUser);

    const art = await this._service.create(req.body);

    const response = BaseHttpResponse.success(art, 201);
    res.status(response.statusCode).json(response);
  }
}
