"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUserByPhoneNumberDto = void 0;
class GetOneUserByPhoneNumberDto {
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    static from(body) {
        if (!body.phoneNumber) {
            throw new Error("missing username property");
        }
        return new GetOneUserByPhoneNumberDto(body.phoneNumber);
    }
}
exports.GetOneUserByPhoneNumberDto = GetOneUserByPhoneNumberDto;
