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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const inversify_express_utils_1 = require("inversify-express-utils");
require("./controllers/user/users.controller");
require("./controllers/art/arts.controller");
const base_http_response_1 = require("./lib/base-http-response");
const Not_authorized_1 = require("./exceptions/Not-authorized");
const Not_authenticated_1 = require("./exceptions/Not-authenticated");
const abstract_application_1 = require("./lib/abstract-application");
const db_context_1 = require("../data/db.context");
const users_repository_1 = require("../data/user/users.repository");
const users_service_1 = require("../logic/services/users.service");
const arts_repository_1 = require("../data/art/arts.repository");
const arts_service_1 = require("../logic/services/arts.service");
const exceptions_1 = require("../logic/exceptions");
class App extends abstract_application_1.Application {
    constructor() {
        super({
            containerOpts: {
                defaultScope: "Singleton",
            },
            morgan: {
                mode: abstract_application_1.MorganMode.DEV,
            },
        });
    }
    configureServices(container) {
        container.bind(db_context_1.DBContext).toSelf();
        container.bind(users_repository_1.UsersRepository).toSelf();
        container.bind(users_service_1.UsersService).toSelf();
        container.bind(arts_repository_1.ArtsRepository).toSelf();
        container.bind(arts_service_1.ArtsService).toSelf();
    }
    setup(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _db = this.container.get(db_context_1.DBContext);
            yield _db.connect();
            this.server = new inversify_express_utils_1.InversifyExpressServer(this.container);
            this.server.setErrorConfig((app) => {
                app.use((err, req, res, next) => {
                    if (err instanceof exceptions_1.ValidationException) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 422);
                        return res.status(response.statusCode).json(response);
                    }
                    if (err instanceof Not_authenticated_1.NotAuthenticated) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 401);
                        return res.status(response.statusCode).json(response);
                    }
                    if (err instanceof Not_authorized_1.NotAuthorized) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 401);
                        return res.status(response.statusCode).json(response);
                    }
                    if (err instanceof exceptions_1.BadRequestError) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 400);
                        return res.status(response.statusCode).json(response);
                    }
                    if (err instanceof Error) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 500);
                        return res.status(response.statusCode).json(response);
                    }
                    next();
                });
            });
            this.server.setConfig((app) => {
                app.use(express_1.default.json());
                app.use((0, morgan_1.default)(options.morgan.mode));
                // cookieSession cookie-session stores the session data on the client within a cookie
                // express-session stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database.
                app.use((0, cookie_session_1.default)({
                    name: "jwt",
                    signed: false,
                    secure: false,
                }));
            });
            const app = this.server.build();
            app.listen(process.env.PORT, () => {
                console.log(`server is running on http://localhost:${process.env.PORT}`);
            });
        });
    }
    get getserver() {
        return this.server;
    }
}
exports.App = App;
new App();
