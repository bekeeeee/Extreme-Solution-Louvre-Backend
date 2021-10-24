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
exports.UsersRepository = void 0;
const inversify_1 = require("inversify");
const db_context_1 = require("../db.context");
let UsersRepository = class UsersRepository {
    constructor(_dbContext) {
        this._dbContext = _dbContext;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.user.find({});
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.user.findOne({ email });
        });
    }
    findOneByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.user.findOne({ username });
        });
    }
    findOneByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.user.findOne({ phoneNumber });
        });
    }
    findOne(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._dbContext.user
                .findOne({ username })
                .select("+password");
            if (!user)
                return null;
            if (!(yield this._dbContext.user.correctPassword(password, user === null || user === void 0 ? void 0 : user.password)))
                return null;
            else
                return user;
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.user.create(entity);
        });
    }
};
UsersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [db_context_1.DBContext])
], UsersRepository);
exports.UsersRepository = UsersRepository;
