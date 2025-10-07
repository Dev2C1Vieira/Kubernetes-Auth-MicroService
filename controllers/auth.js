const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Funcionario = require("../models/funcionario");
const TipoFuncionario = require("../models/tipoFuncionario");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, password, tipoFuncionarioId } = req.body;

      const existing = await Funcionario.findOne({ where: { email } });
      if (existing)
        return res.status(400).json({ message: "Email already registered." });

      const hashed = await bcrypt.hash(password, 10);

      const funcionario = await Funcionario.create({
        nome,
        email,
        password: hashed,
        tipoFuncionarioId,
      });

      res.status(201).json({
        message: "User registered successfully.",
        funcionario: {
          id: funcionario.id,
          nome: funcionario.nome,
          email: funcionario.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user." });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const funcionario = await Funcionario.findOne({
        where: { email },
        include: { model: TipoFuncionario, as: "tipoFuncionario" },
      });

      if (!funcionario)
        return res.status(404).json({ message: "User not found." });

      const valid = await bcrypt.compare(password, funcionario.password);
      if (!valid)
        return res.status(401).json({ message: "Invalid credentials." });

      const token = jwt.sign(
        {
          id: funcionario.id,
          email: funcionario.email,
          role: funcionario.tipoFuncionario?.descricaoTipoFuncionario,
        },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.json({
        message: "Login successful.",
        token,
        funcionario: {
          id: funcionario.id,
          nome: funcionario.nome,
          email: funcionario.email,
          role: funcionario.tipoFuncionario?.descricaoTipoFuncionario,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging in." });
    }
  },
};
