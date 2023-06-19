describe("GET /api/tasks/:id", () => {
    it("should return a task", async () => {
      const res = await request(app).get(
        "/api/tasks/6331abc9e9ececcc2d449e44"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Product 1");
    });
  });
  
  describe("POST /api/tasks", () => {
    it("should create a task", async () => {
      const res = await request(app).post("/api/tasks").send({
        name: "Product 2",
        price: 1009,
        description: "Description 2",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Product 2");
    });
  });
  
  describe("PUT /api/tasks/:id", () => {
    it("should update a task", async () => {
      const res = await request(app)
        .patch("/api/tasks/6331abc9e9ececcc2d449e44")
        .send({
          name: "Product 4",
          price: 104,
          description: "Description 4",
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