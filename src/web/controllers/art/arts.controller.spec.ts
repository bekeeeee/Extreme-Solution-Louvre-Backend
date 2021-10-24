import "reflect-metadata";

import { App } from "../../application";
import "dotenv/config";

import supertest from "supertest";

const app = new App();
const request = supertest(app.getserver());

// Example of how to setup E2E tests
describe("Art Controller", () => {
  beforeAll(async (done) => {
    done();
  });

  // create an art __tests__

  it("Not authenticated return, create a new art entry", async (done) => {
    const res = await request.post("/api/v1/arts").send({
      name: "Bekee",
      image: "art.png",
      description: "description",
      artist: "bekeee",
    });
    expect(res.status).toBe(401);
    done();
  });

  it("Not authorized return, create a new art entry", async (done) => {
    let res = await request.post("/api/v1/users/login").send({
      username: "user1",
      password: "12345",
    });
    expect(res.status).toBe(201);

    res = await request.post("/api/v1/arts").send({
      name: "Bekee",
      image: "art.png",
      description: "description",
      artist: "bekeee",
    });
    expect(res.status).toBe(401);
    done();
  });

  it("Create a new art entry by admin user", async (done) => {
    let res = await request.post("/api/v1/users/login").send({
      username: "admin1",
      password: "12345",
    });
    expect(res.status).toBe(201);

    res = await request.post("/api/v1/arts").send({
      name: "Bekee",
      image: "art.png",
      description: "description",
      artist: "bekeee",
    });
    expect(res.status).toBe(201);
    done();
  });

  // get all arts __tests__

  it("Not authenticated, get all arts", async (done) => {
    const res = await request.get("/api/v1/arts");
    expect(res.status).toBe(401);
    done();
  });

  it("Get all arts, admin user", async (done) => {
    let res = await request.post("/api/v1/users/login").send({
      username: "admin1",
      password: "12345",
    });
    expect(res.status).toBe(201);

    res = await request.get("/api/v1/arts");
    expect(res.status).toBe(200);
    done();
  });

  it("Get all arts, guest user", async (done) => {
    let res = await request.post("/api/v1/users/login").send({
      username: "user1",
      password: "12345",
    });
    expect(res.status).toBe(201);

    res = await request.get("/api/v1/arts");
    expect(res.status).toBe(200);
    done();
  });

  afterEach(async (done) => {
    // await artsModel.deleteMany()
    done();
  });
});
