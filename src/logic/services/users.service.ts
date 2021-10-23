import { UsersRepository } from "@data/users.repository";
import {
  CreateUserDto,
  GetOneUserByEmailDto,
  GetOneUserByPhoneNumberDto,
  GetOneUserByUsernameDto,
  SigninDto,
  UserDto,
} from "@logic/dto/users";
import { BadRequestError } from "@logic/exceptions";
import { injectable } from "inversify";

@injectable()
export class UsersService {
  constructor(private readonly _usersRepo: UsersRepository) {}

  // check if email is used or not
  async findOneByEmailSignUp(getOneUserByEmailDto: GetOneUserByEmailDto) {
    const foundUser = await this._usersRepo.findOneByEmail(
      getOneUserByEmailDto.email
    );
    if (foundUser) {
      throw new BadRequestError("Email is used");
    }
  }

  // check if username is used or not
  async findOneByUsernameSignup(
    getOneUserByUsernsameDto: GetOneUserByUsernameDto
  ) {
    const foundUser = await this._usersRepo.findOneByUsername(
      getOneUserByUsernsameDto.username
    );

    if (foundUser) {
      throw new BadRequestError("Username is used");
    }
  }
  // check if phoneNumber is used or not

  async findOneByPhoneNumberSignup(
    getOneUserByPhoneNumberDto: GetOneUserByPhoneNumberDto
  ) {
    const foundUser = await this._usersRepo.findOneByPhoneNumber(
      getOneUserByPhoneNumberDto.phoneNumber
    );

    if (foundUser) {
      throw new BadRequestError("phoneNumber is used");
    }
  }

  async findOne(signinDto: SigninDto) {
    const user = await this._usersRepo.findOne(
      signinDto.username,
      signinDto.password
    );
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }
    return UserDto.from(user);
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this._usersRepo.create(createUserDto);
    return UserDto.from(createdUser);
  }

  async all() {
    const users = await this._usersRepo.all();
    return UserDto.fromMany(users);
  }
}
