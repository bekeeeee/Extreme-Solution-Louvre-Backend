"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const exceptions_1 = require("../../exceptions");
class Validate {
    static validateEmail(email) {
        if (!email) {
            throw new exceptions_1.ValidationException("Missing property email");
        }
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email))
            throw new exceptions_1.ValidationException("Invalid Email");
    }
    static validateSize(input, size, propName) {
        if (!input) {
            throw new exceptions_1.ValidationException(`Missing property ${propName}`);
        }
        if (typeof input !== "string") {
            throw new exceptions_1.ValidationException(`${propName} must be string`);
        }
        if (input.length < size)
            throw new exceptions_1.ValidationException(`${propName} must be more than ${size} character`);
    }
    static validateEnum(input, arr, propName) {
        if (!input) {
            throw new exceptions_1.ValidationException(`Missing property ${propName}`);
        }
        if (!arr.includes(input)) {
            throw new exceptions_1.ValidationException(`${propName} must be one of ${arr}`);
        }
    }
}
exports.Validate = Validate;
