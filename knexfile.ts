import path from "path";

const config = {
  develop: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
    useNullAsDefault: true,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(
        __dirname,
        "buld",
        "src",
        "database",
        "database.sqlite"
      ),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "buld",
        "src",
        "database",
        "migrations"
      ),
    },
    seeds: {
      directory: path.resolve(__dirname, "buld", "src", "database", "seeds"),
    },
    useNullAsDefault: true,
  },
};

export default config;
