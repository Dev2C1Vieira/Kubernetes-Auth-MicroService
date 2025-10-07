const TipoFuncionario = require("../models/tipoFuncionario");

module.exports = {
  async create(req, res) {
    try {
      const { descricaoTipoFuncionario } = req.body;

      if (!descricaoTipoFuncionario)
        return res.status(400).json({ message: "Name is required." });

      const existing = await TipoFuncionario.findOne({
        where: { descricaoTipoFuncionario },
      });

      if (existing)
        return res.status(400).json({ message: "Type already exists." });

      const tipo = await TipoFuncionario.create({ descricaoTipoFuncionario });
      res.status(201).json({ message: "Type created successfully.", tipo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating type." });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;

      const tipo = await TipoFuncionario.findByPk(id);
      if (!tipo) return res.status(404).json({ message: "Type not found." });

      await tipo.destroy();
      res.json({ message: "Type deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting type." });
    }
  },
};
