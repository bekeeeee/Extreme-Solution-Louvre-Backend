"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const validate_1 = require("../utils/validate");
class CreateUserDto {
    constructor(username, email, password, role, phoneNumber) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }
    static from(body) {
        validate_1.Validate.validateEmail(body.email);
        validate_1.Validate.validateSize(body.username, 5, 'username');
        validate_1.Validate.validateSize(body.password, 5, 'password');
        validate_1.Validate.validateEnum(body.role, ['admin', 'user'], 'role');
        validate_1.Validate.validateSize(body.phoneNumber, 8, 'phoneNumber');
        return new CreateUserDto(body.username, body.email, body.password, body.role, body.phoneNumber);
    }
}
exports.CreateUserDto = CreateUserDto;
