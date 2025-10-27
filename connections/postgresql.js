const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.CLOUD_PG_DATABASE,
  process.env.CLOUD_PG_USER,
  process.env.CLOUD_PG_PASSWORD,
  {
    host: process.env.CLOUD_PG_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    port: parseInt(process.env.CLOUD_PG_PORT, 10) || 5433,
    logging: console.log,
    define: {
      schema: process.env.CLOUD_PG_SCHEMA || "public",
    },
  }
);

module.exports = { sequelize };
