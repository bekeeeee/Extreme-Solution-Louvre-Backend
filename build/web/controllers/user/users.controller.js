"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UsersController = void 0;
const users_1 = require("../../../logic/dto/users");
const users_service_1 = require("../../../logic/services/users.service");
const base_http_response_1 = require("../../lib/base-http-response");
const Authorized_to_admin_1 = require("../../middlewares/Authorized-to-admin");
const current_user_middleware_1 = require("../../middlewares/current-user.middleware");
const validate_request_middleware_1 = require("../../middlewares/validate-request.middleware");
const inversify_express_utils_1 = require("inversify-express-utils");
let UsersController = class UsersController {
    constructor(_service) {
        this._service = _service;
    }
    //Signup route
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.findOneByEmailSignUp({ email: req.body.email });
            yield this._service.findOneByUsernameSignup({
                username: req.body.username,
            });
            yield this._service.findOneByPhoneNumberSignup({
                phoneNumber: req.body.phoneNumber,
            });
            const user = yield this._service.create(req.body);
            const jwt = yield users_1.Jwt.signToken(users_1.Jwt.from(req.body));
            req.session = { jwt };
            user.password = "";
            const response = base_http_response_1.BaseHttpResponse.success(user);
            res.json(response);
        });
    }
    //Login route
    lgoin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._service.findOne(req.body);
            const jwt = yield users_1.Jwt.signToken(users_1.Jwt.from(user));
            req.session = { jwt };
            user.password = "";
            const response = base_http_response_1.BaseHttpResponse.success(user);
            res.json(response);
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this._service.all();
            const response = base_http_response_1.BaseHttpResponse.success(users);
            res.json(response);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", validate_request_middleware_1.ValidateRequestMiddleware.with(users_1.CreateUserDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/login", validate_request_middleware_1.ValidateRequestMiddleware.with(users_1.SigninDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "lgoin", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", current_user_middleware_1.CurrentUserMiddleware, Authorized_to_admin_1.AuthorizedToAdmin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
UsersController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/user"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
