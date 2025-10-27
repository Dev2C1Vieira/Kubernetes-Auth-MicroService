const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.CLOUD_PG_DATABASE,
  process.env.CLOUD_PG_USER,
  process.env.CLOUD_PG_PASSWORD,
  {
    host: process.env.CLOUD_PG_HOST,
    dialect: "postgres",
    port: parseInt(process.env.CLOUD_PG_PORT, 10) || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log,
    define: {
      schema: process.env.CLOUD_PG_SCHEMA || "public",
    },
  }
);

// Retry infinito com delay configurável
async function connectWithRetry(delay = 5000) {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log("PostgreSQL connection established successfully.");
      break;
    } catch (err) {
      console.error(
        `Failed to connect to PostgreSQL. Retrying in ${delay / 1000}s...`,
        err.message
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

module.exports = { sequelize, connectWithRetry };
