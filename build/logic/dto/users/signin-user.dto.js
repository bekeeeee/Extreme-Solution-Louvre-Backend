"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninDto = void 0;
const validate_1 = require("../utils/validate");
class SigninDto {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    static from(body) {
        validate_1.Validate.validateSize(body.username, 5, 'username');
        validate_1.Validate.validateSize(body.password, 5, 'password');
        return new SigninDto(body.username, body.password);
    }
}
exports.SigninDto = SigninDto;
