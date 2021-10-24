"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserMiddleware = void 0;
const users_1 = require("../../logic/dto/users");
const Not_authenticated_1 = require("../exceptions/Not-authenticated");
const CurrentUserMiddleware = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        next(new Not_authenticated_1.NotAuthenticated());
    }
    else {
        const payload = yield users_1.Jwt.verifyToken((_b = req.session) === null || _b === void 0 ? void 0 : _b.jwt);
        req.currentUser = payload;
        next();
    }
});
exports.CurrentUserMiddleware = CurrentUserMiddleware;
