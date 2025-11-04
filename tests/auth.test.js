const request = require("supertest");
const app = require("../index");

// Simulates a mock implementation of the auth controller
jest.mock("../controllers/auth", () => ({
  // Login route mock
  login: (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      return res.status(200).json({ message: "Mocked login success" });
    } else {
      return res.status(400).json({ message: "Missing credentials" });
    }
  },

  // Register route mock
  register: (req, res) => {
    const { nome, email, password, tipoFuncionarioId } = req.body;
    if (nome && email && password && tipoFuncionarioId) {
      return res.status(201).json({ message: "Mocked register success" });
    } else {
      return res.status(400).json({ message: "Missing fields" });
    }
  },
}));

describe("Auth API", () => {
  it("deve retornar 200 no login (mocked)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "P#123456" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Mocked login success");
  });

  it("deve retornar 201 no register (mocked)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      nome: "User",
      email: "userdf@test.com",
      password: "1234",
      tipoFuncionarioId: 1,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Mocked register success");
  });
});
