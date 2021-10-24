"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(id, username, email, role, password, phoneNumber) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
    static from(entity) {
        return new UserDto(entity._id, entity.username, entity.email, entity.role, entity.password, entity.phoneNumber);
    }
    static fromMany(users) {
        return users.map((User) => UserDto.from(User));
    }
}
exports.UserDto = UserDto;
