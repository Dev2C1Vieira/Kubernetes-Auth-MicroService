const { DataTypes } = require("sequelize");
const { sequelize } = require("../connections/postgresql");
const TipoFuncionario = require("./tipoFuncionario");

const Funcionario = sequelize.define(
  "Funcionario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tipoFuncionarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "tipoFuncionarioId",
      references: {
        model: TipoFuncionario,
        key: "id",
      },
    },
  },
  {
    schema: process.env.PG_SCHEMA || "app",
    tableName: "funcionario",
    timestamps: false,
  }
);

Funcionario.belongsTo(TipoFuncionario, {
  foreignKey: "tipoFuncionarioId",
  as: "tipoFuncionario",
});

TipoFuncionario.hasMany(Funcionario, {
  foreignKey: "tipoFuncionarioId",
  as: "funcionarios",
});

module.exports = Funcionario;
