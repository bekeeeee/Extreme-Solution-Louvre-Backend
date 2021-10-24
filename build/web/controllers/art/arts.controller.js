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
exports.ArtsController = void 0;
const arts_1 = require("../../../logic/dto/arts");
const arts_service_1 = require("../../../logic/services/arts.service");
const base_http_response_1 = require("../../lib/base-http-response");
const Authorized_to_admin_1 = require("../../middlewares/Authorized-to-admin");
const current_user_middleware_1 = require("../../middlewares/current-user.middleware");
const validate_request_middleware_1 = require("../../middlewares/validate-request.middleware");
const inversify_express_utils_1 = require("inversify-express-utils");
let ArtsController = class ArtsController {
    constructor(_service) {
        this._service = _service;
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const art = yield this._service.create(req.body);
            const response = base_http_response_1.BaseHttpResponse.success(art, 201);
            res.status(response.statusCode).json(response);
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arts = yield this._service.all();
            const response = base_http_response_1.BaseHttpResponse.success(arts);
            res.json(response);
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const art = yield this._service.updateOne(req.body);
            const response = base_http_response_1.BaseHttpResponse.success(art, 200);
            res.status(response.statusCode).json(response);
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteOne(req.body);
            const response = base_http_response_1.BaseHttpResponse.success({}, 200);
            res.status(response.statusCode).json(response);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", current_user_middleware_1.CurrentUserMiddleware, Authorized_to_admin_1.AuthorizedToAdmin, validate_request_middleware_1.ValidateRequestMiddleware.with(arts_1.CreateArtDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArtsController.prototype, "store", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/', current_user_middleware_1.CurrentUserMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArtsController.prototype, "index", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)('/:id', current_user_middleware_1.CurrentUserMiddleware, Authorized_to_admin_1.AuthorizedToAdmin, validate_request_middleware_1.ValidateRequestMiddleware.withParams(arts_1.UpdateArtDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArtsController.prototype, "edit", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id', current_user_middleware_1.CurrentUserMiddleware, Authorized_to_admin_1.AuthorizedToAdmin, validate_request_middleware_1.ValidateRequestMiddleware.withParams(arts_1.GetOneArtDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArtsController.prototype, "destroy", null);
ArtsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/art"),
    __metadata("design:paramtypes", [arts_service_1.ArtsService])
], ArtsController);
exports.ArtsController = ArtsController;
