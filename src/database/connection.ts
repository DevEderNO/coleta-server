import knex from "knex";
import config from "../../knexfile";
const enviroment = process.env.ENVIROMENT || "develop";

const connection = knex(
  enviroment === "develop" ? config.develop : config.production
);

export default connection;
