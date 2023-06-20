const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();
/* Connecting to the database before each test. */

describe("Test request with mongoose", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
  });
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });
  describe("GET /api/tasks/:id", () => {
    it("should return a task", async () => {
      const res = await request(app).get("/api/tasks/6331abc9e9ececcc2d449e44");
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Task 1");
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a task", async () => {
      const res = await request(app).post("/api/tasks").send({
        tittle: "Task 2",
        description: "Description of the task",
        assignee: "Jean Charles",
        dateDue: "23/10/2023",
        createdBy: "Olivier Dupont",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Task 2");
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update a task", async () => {
      const res = await request(app)
        .patch("/api/tasks/6331abc9e9ececcc2d449e44")
        .send({
          name: "Task 42",
          dateDue: "19/10/2023",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task", async () => {
      const res = await request(app).delete(
        "/api/tasks/6331abc9e9ececcc2d449e44"
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
