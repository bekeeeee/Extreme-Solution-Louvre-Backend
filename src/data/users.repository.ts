import { injectable } from "inversify";
import { DBContext } from "@data/db.context";

@injectable()
export class UsersRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async all() {
    return this._dbContext.user.find({});
  }
}
