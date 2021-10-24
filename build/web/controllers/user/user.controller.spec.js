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
require("reflect-metadata");
const application_1 = require("../../application");
require("dotenv/config");
const supertest_1 = __importDefault(require("supertest"));
const app = new application_1.App();
const request = (0, supertest_1.default)(app.getserver());
// Example of how to setup E2E tests
describe("Users Controller", () => {
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        done();
    }));
    // all signup tests
    it("returns a 201 on successful signup", () => __awaiter(void 0, void 0, void 0, function* () {
        return request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
    }));
    it("returns a 400 with an invalid email,signup", () => __awaiter(void 0, void 0, void 0, function* () {
        return request
            .post("/api/v1/user")
            .send({
            email: "invalid.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(400);
    }));
    it("returns a 400 with an invalid username,signup", () => __awaiter(void 0, void 0, void 0, function* () {
        return request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "t",
            password: "1245678",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(400);
    }));
    it("returns a 400 with an invalid password,signup", () => __awaiter(void 0, void 0, void 0, function* () {
        return request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "12",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(400);
    }));
    it("returns a 400 with an invalid role,signup", () => __awaiter(void 0, void 0, void 0, function* () {
        return request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "12345678",
            role: "false",
        })
            .expect(400);
    }));
    it("returns a 400 with missing email, username, password and role", () => __awaiter(void 0, void 0, void 0, function* () {
        return request.post("/api/v1/user").send({}).expect(400);
    }));
    it("disallows duplicate emails", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        yield request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test2",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(400);
    }));
    it("disallows duplicate username", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        yield request
            .post("/api/v1/user")
            .send({
            email: "test2@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(400);
    }));
    it("sets a cookie after successful signup", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        expect(response.get("Set-Cookie")).toBeDefined();
    }));
    // all login tests
    it("returns a 201 on successful login", () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        return request
            .post("/api/v1/user")
            .send({
            username: "test1",
            password: "password",
        })
            .expect(201);
    }));
    it("returns a 400 , Invalid username", () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        return request
            .post("/api/v1/user")
            .send({
            username: "invalid",
            password: "password",
        })
            .expect(400);
    }));
    it("returns a 400 , Invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        return request
            .post("/api/v1/user")
            .send({
            username: "test1",
            password: "invalid",
        })
            .expect(400);
    }));
    // get all users tests
    it("Not authenticated, get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        return request.get("/api/v1/user").expect(401);
    }));
    it("Not authorized, get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "user1",
            phoneNumber: "12345678",
        })
            .expect(201);
        return request.get("/api/v1/user").expect(401);
    }));
    it("return 201, get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        request
            .post("/api/v1/user")
            .send({
            email: "test@test.com",
            username: "test1",
            password: "password",
            role: "admin",
            phoneNumber: "12345678",
        })
            .expect(201);
        return request.get("/api/v1/user").expect(401);
    }));
    afterEach((done) => __awaiter(void 0, void 0, void 0, function* () {
        // await artsModel.deleteMany()
        done();
    }));
});
