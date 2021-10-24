"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.BadRequestError = BadRequestError;
