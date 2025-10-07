const express = require("express");
const router = express.Router();
const TipoFuncionarioController = require("../controllers/tipoFuncionario");

router.post("/", TipoFuncionarioController.create);
router.delete("/:id", TipoFuncionarioController.remove);

module.exports = router;
