"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const inversify_1 = require("inversify");
const users_repository_1 = require("../../data/user/users.repository");
const exceptions_1 = require("../exceptions");
const users_1 = require("../../logic/dto/users");
let UsersService = class UsersService {
    constructor(_usersRepo) {
        this._usersRepo = _usersRepo;
    }
    // check if email is used or not
    findOneByEmailSignUp(getOneUserByEmailDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this._usersRepo.findOneByEmail(getOneUserByEmailDto.email);
            if (foundUser) {
                throw new exceptions_1.BadRequestError("Email is used");
            }
        });
    }
    // check if username is used or not
    findOneByUsernameSignup(getOneUserByUsernsameDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this._usersRepo.findOneByUsername(getOneUserByUsernsameDto.username);
            if (foundUser) {
                throw new exceptions_1.BadRequestError("Username is used");
            }
        });
    }
    // check if phoneNumber is used or not
    findOneByPhoneNumberSignup(getOneUserByPhoneNumberDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this._usersRepo.findOneByPhoneNumber(getOneUserByPhoneNumberDto.phoneNumber);
            if (foundUser) {
                throw new exceptions_1.BadRequestError("phoneNumber is used");
            }
        });
    }
    findOne(signinDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._usersRepo.findOne(signinDto.username, signinDto.password);
            if (!user) {
                throw new exceptions_1.BadRequestError("Invalid credentials");
            }
            return users_1.UserDto.from(user);
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this._usersRepo.create(createUserDto);
            return users_1.UserDto.from(createdUser);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this._usersRepo.all();
            return users_1.UserDto.fromMany(users);
        });
    }
};
UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
