"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUserByUsernameDto = void 0;
class GetOneUserByUsernameDto {
    constructor(username) {
        this.username = username;
    }
    static from(body) {
        if (!body.username) {
            throw new Error('missing username property');
        }
        return new GetOneUserByUsernameDto(body.username);
    }
}
exports.GetOneUserByUsernameDto = GetOneUserByUsernameDto;
