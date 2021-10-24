"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUserByEmailDto = void 0;
class GetOneUserByEmailDto {
    constructor(email) {
        this.email = email;
    }
    static from(body) {
        if (!body.email) {
            throw new Error('missing email property');
        }
        return new GetOneUserByEmailDto(body.email);
    }
}
exports.GetOneUserByEmailDto = GetOneUserByEmailDto;
