describe("GET /api/rooms/:id", () => {
  it("should return a room", async () => {
    const res = await request(app).get("/api/rooms/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("room 1");
  });
});

describe("POST /api/rooms", () => {
  it("should create a room", async () => {
    const res = await request(app)
      .post("/api/rooms")
      .send({
        users: ["6331abc9e9ececcc2d449e44", "6331abc9e9ececcc2d449e05"],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("room 2");
  });
});

// describe("PUT /api/rooms/:id", () => {
//   it("should update a room", async () => {
//     const res = await request(app)
//       .patch("/api/rooms/6331abc9e9ececcc2d449e44")
//       .send({
//         name: "Task 42",
//         dateDue: "19/10/2023",
//       });
//     expect(res.statusCode).toBe(200);
//     expect(res.body.price).toBe(104);
//   });
// });

describe("DELETE /api/rooms/:id", () => {
  it("should delete a room", async () => {
    const res = await request(app).delete(
      "/api/rooms/6331abc9e9ececcc2d449e44"
    );
    expect(res.statusCode).toBe(200);
  });
});
