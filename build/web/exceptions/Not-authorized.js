"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorized = void 0;
class NotAuthorized extends Error {
    constructor() {
        super('Not Authorized');
    }
}
exports.NotAuthorized = NotAuthorized;
