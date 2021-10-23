import { UsersRepository } from "@data/users.repository";
import { injectable } from "inversify";

@injectable()
export class UsersService {
  constructor(private readonly _usersRepo: UsersRepository) {}

  async all() {
    const users = await this._usersRepo.all();
    return users;
  }
}
