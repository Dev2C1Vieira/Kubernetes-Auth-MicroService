require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { connectWithRetry } = require("./connections/postgresql");

const authRoutes = require("./routes/auth");
const tipoFuncionarioRoutes = require("./routes/tipoFuncionario");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth Microservice API");
});

app.use("/api/auth", authRoutes);
app.use("/api/tipo-funcionario", tipoFuncionarioRoutes);

if (require.main === module) {
  app.listen(port, "0.0.0.0", async () => {
    console.log(`Server listening on port ${port}`);
    await connectWithRetry();
  });
}

module.exports = app;
