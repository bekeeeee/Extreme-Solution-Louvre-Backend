"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Jwt {
    constructor(email, username, role) {
        this.email = email;
        this.username = username;
        this.role = role;
    }
    static from(body) {
        if (!body.email) {
            throw new Error('missing email property');
        }
        if (!body.username) {
            throw new Error('missing username property');
        }
        if (!body.role) {
            throw new Error('missing role property');
        }
        return new Jwt(body.email, body.username, body.role);
    }
    static signToken(jwtDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign(Object.assign({}, jwtDto), process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
        });
    }
    static verifyToken(jwtData) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(jwtData, process.env.JWT_SECRET);
        });
    }
}
exports.Jwt = Jwt;
