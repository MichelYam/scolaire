const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");

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
  describe("GET /api/messages/:id", () => {
    it("should return a message", async () => {
      const res = await request(app).get(
        "/api/messages/6331abc9e9ececcc2d449e44"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Room 1");
    });
  });

  describe("POST /api/messages", () => {
    it("should create a message", async () => {
      const res = await request(app).post("/api/messages").send({
        roomId: "6331abc9e9ececcc2d449e44",
        sender: "6331abc9e9ececcc2d449e44",
        content: "New message",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Room 2");
    });
  });

  describe("PUT /api/messages/:id", () => {
    it("should update a message", async () => {
      const res = await request(app)
        .patch("/api/messages/6331abc9e9ececcc2d449e44")
        .send({
          name: "Room 42",
          dateDue: "05/10/2023",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    });
  });

  describe("DELETE /api/messages/:id", () => {
    it("should delete a message", async () => {
      const res = await request(app).delete(
        "/api/messages/6331abc9e9ececcc2d449e44"
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
