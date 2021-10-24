"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.ValidationException = ValidationException;
