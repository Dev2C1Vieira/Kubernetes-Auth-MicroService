const { DataTypes } = require("sequelize");
const { sequelize } = require("../connections/postgresql");

const TipoFuncionario = sequelize.define(
  "TipoFuncionario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    descricaoTipoFuncionario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "descricaoTipoFuncionario",
    },
  },
  {
    schema: process.env.PG_SCHEMA || "app",
    tableName: "tipoFuncionario",
    timestamps: false,
  }
);

module.exports = TipoFuncionario;
