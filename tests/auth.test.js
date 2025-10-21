const request = require("supertest");
const app = require("../index");

// Simula o controlador AuthController
jest.mock("../controllers/auth", () => ({
  login: (req, res) => res.status(200).json({ message: "Mocked login success" }),
  register: (req, res) => res.status(201).json({ message: "Mocked register success" }),
}));

describe("Auth API", () => {
  it("deve retornar 200 no login (mocked)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "P#123456" });
    expect(res.statusCode).toBe(200);
  });
});
