"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthenticated = void 0;
class NotAuthenticated extends Error {
    constructor() {
        super("Not Authenticated");
    }
}
exports.NotAuthenticated = NotAuthenticated;
