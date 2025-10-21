require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { sequelize } = require("./connections/postgresql");

const authRoutes = require("./routes/auth");
const tipoFuncionarioRoutes = require("./routes/tipoFuncionario");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth Microservice API");
});

app.use("/api/auth", authRoutes);
app.use("/api/tipo-funcionario", tipoFuncionarioRoutes);

// Só inicia o servidor se o arquivo for executado diretamente
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    sequelize
      .authenticate()
      .then(() => {
        console.log("PostgreSQL connection established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  });
}

// Exporta o app para poder ser usado em testes, por exemplo
module.exports = app;
