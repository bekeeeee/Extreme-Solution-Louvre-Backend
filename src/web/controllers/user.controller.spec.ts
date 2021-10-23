import "reflect-metadata";

import { App } from "../application";
import "dotenv/config";

import supertest from "supertest";

const app = new App();
const request = supertest(app.getserver());

// Example of how to setup E2E tests
describe("Users Controller", () => {
  beforeAll(async (done) => {
    done();
  });
  // all signup tests
  it("returns a 201 on successful signup", async () => {
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
  });

  it("returns a 400 with an invalid email,signup", async () => {
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
  });

  it("returns a 400 with an invalid username,signup", async () => {
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
  });

  it("returns a 400 with an invalid password,signup", async () => {
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
  });
  it("returns a 400 with an invalid role,signup", async () => {
    return request
      .post("/api/v1/user")
      .send({
        email: "test@test.com",
        username: "test1",
        password: "12345678",
        role: "false",
      })
      .expect(400);
  });
  it("returns a 400 with missing email, username, password and role", async () => {
    return request.post("/api/v1/user").send({}).expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request
      .post("/api/v1/user")
      .send({
        email: "test@test.com",
        username: "test1",
        password: "password",
        role: "user1",
        phoneNumber: "12345678",
      })
      .expect(201);

    await request
      .post("/api/v1/user")
      .send({
        email: "test@test.com",
        username: "test2",
        password: "password",
        role: "user1",
        phoneNumber: "12345678",
      })
      .expect(400);
  });

  it("disallows duplicate username", async () => {
    await request
      .post("/api/v1/user")
      .send({
        email: "test@test.com",
        username: "test1",
        password: "password",
        role: "user1",
        phoneNumber: "12345678",
      })
      .expect(201);

    await request
      .post("/api/v1/user")
      .send({
        email: "test2@test.com",
        username: "test1",
        password: "password",
        role: "user1",
        phoneNumber: "12345678",
      })
      .expect(400);
  });

  it("sets a cookie after successful signup", async () => {
    const response = await request
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
  });

  // all login tests

  it("returns a 201 on successful login", async () => {
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
  });

  it("returns a 400 , Invalid username", async () => {
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
  });

  it("returns a 400 , Invalid password", async () => {
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
  });
  afterEach(async (done) => {
    // await artsModel.deleteMany()
    done();
  });
});
