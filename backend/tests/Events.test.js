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
  describe("GET /api/events/:id", () => {
    it("should return a event", async () => {
      const res = await request(app).get(
        "/api/events/6331abc9e9ececcc2d449e44"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Event 1");
    });
  });

  describe("POST /api/events", () => {
    it("should create a event", async () => {
      const res = await request(app).post("/api/events").send({
        tittle: "Event 2",
        description: "Description of the event",
        assignee: "Jean Charles",
        date: "19/10/2023",
        timetable: "15:00",
        createdBy: "Olivier Dupont",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Event 2");
    });
  });

  describe("PUT /api/events/:id", () => {
    it("should update a event", async () => {
      const res = await request(app)
        .patch("/api/events/6331abc9e9ececcc2d449e44")
        .send({
          name: "Event 42",
          dateDue: "05/10/2023",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    });
  });

  describe("DELETE /api/events/:id", () => {
    it("should delete a event", async () => {
      const res = await request(app).delete(
        "/api/events/6331abc9e9ececcc2d449e44"
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
