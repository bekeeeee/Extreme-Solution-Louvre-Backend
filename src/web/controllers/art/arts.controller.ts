import {
  CreateArtDto,
  GetOneArtDto,
  UpdateArtDto,
} from "../../../logic/dto/arts";
import { ArtsService } from "../../../logic/services/arts.service";
import { BaseHttpResponse } from "../../lib/base-http-response";
import { AuthorizedToAdmin } from "../../middlewares/Authorized-to-admin";
import { CurrentUserMiddleware } from "../../middlewares/current-user.middleware";
import { ValidateRequestMiddleware } from "../../middlewares/validate-request.middleware";
import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";

@controller("/api/v1/art")
export class ArtsController {
  constructor(private readonly _service: ArtsService) {}
  @httpPost(
    "/",
    CurrentUserMiddleware,
    AuthorizedToAdmin,
    ValidateRequestMiddleware.with(CreateArtDto)
  )
  async createArt(req: Request, res: Response) {
    const art = await this._service.create(req.body);
    const response = BaseHttpResponse.success(art, 201);
    res.status(response.statusCode).json(response);
  }

  @httpGet("/", CurrentUserMiddleware)
  async getAllArts(req: Request, res: Response) {
    const arts = await this._service.all();

    const response = BaseHttpResponse.success(arts);
    res.json(response);
  }

  @httpPatch(
    "/:id",
    CurrentUserMiddleware,
    AuthorizedToAdmin,
    ValidateRequestMiddleware.withParams(UpdateArtDto)
  )
  async editArt(req: Request, res: Response) {
    const art = await this._service.updateOne(req.body);

    const response = BaseHttpResponse.success(art, 200);

    res.status(response.statusCode).json(response);
  }

  @httpDelete(
    "/:id",
    CurrentUserMiddleware,
    AuthorizedToAdmin,
    ValidateRequestMiddleware.withParams(GetOneArtDto)
  )
  async deleteArt(req: Request, res: Response) {
    await this._service.deleteOne(req.body);

    const response = BaseHttpResponse.success({}, 200);

    res.status(response.statusCode).json(response);
  }
}
