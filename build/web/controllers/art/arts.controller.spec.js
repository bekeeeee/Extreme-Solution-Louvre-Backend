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
describe("Art Controller", () => {
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        done();
    }));
    // create an art __tests__
    it("Not authenticated return, create a new art entry", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post("/api/v1/arts").send({
            name: "Bekee",
            image: "art.png",
            description: "description",
            artist: "bekeee",
        });
        expect(res.status).toBe(401);
        done();
    }));
    it("Not authorized return, create a new art entry", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "user1",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.post("/api/v1/arts").send({
            name: "Bekee",
            image: "art.png",
            description: "description",
            artist: "bekeee",
        });
        expect(res.status).toBe(401);
        done();
    }));
    it("Create a new art entry by admin user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "admin1",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.post("/api/v1/arts").send({
            name: "Bekee",
            image: "art.png",
            description: "description",
            artist: "bekeee",
        });
        expect(res.status).toBe(201);
        done();
    }));
    // get all arts __tests__
    it("Not authenticated, get all arts", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/api/v1/arts");
        expect(res.status).toBe(401);
        done();
    }));
    it("Get all arts, admin user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "admin1",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.get("/api/v1/arts");
        expect(res.status).toBe(200);
        done();
    }));
    it("Get all arts, guest user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "user1",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.get("/api/v1/arts");
        expect(res.status).toBe(200);
        done();
    }));
    // update an art __tests__
    it("Not authenticated, update an artist", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.patch("/api/v1/arts/344545323445454542");
        expect(res.status).toBe(401);
        done();
    }));
    it("Not authorized, update an art by guest user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "user1",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.patch("/api/v1/arts/344545323445454542");
        expect(res.status).toBe(401);
        done();
    }));
    it("update an art by admin user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "admin",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.patch("/api/v1/arts/344545323445454542");
        expect(res.status).toBe(201);
        done();
    }));
    // delete an art __tests__
    it("Not authenticated, delete an artist", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete("/api/v1/arts/344545323445454542");
        expect(res.status).toBe(401);
        done();
    }));
    it("Not authorized, delete an art by guest user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "user1",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.delete("/api/v1/arts/344545323445454542");
        expect(res.status).toBe(401);
        done();
    }));
    it("delete an art by admin user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield request.post("/api/v1/users/login").send({
            username: "admin",
            password: "12345",
        });
        expect(res.status).toBe(201);
        res = yield request.delete("/api/v1/arts/344545323445454542");
        expect(res.status).toBe(201);
        done();
    }));
    afterEach((done) => __awaiter(void 0, void 0, void 0, function* () {
        // await artsModel.deleteMany()
        done();
    }));
});
