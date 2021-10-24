import { injectable } from "inversify";
import { DBContext } from "@data/db.context";
import { IArt } from "./arts.model";

@injectable()
export class ArtsRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async all() {
    return this._dbContext.art.find({});
  }
  async create(entity: Partial<IArt>) {
    return this._dbContext.art.create(entity);
  }
}
