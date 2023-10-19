const postgres = require("postgres");

const sql = postgres({
    host: "bmsdev.cbb4tdiqsigu.us-east-1.rds.amazonaws.com",
    port: "5432",
    username: "postgres",
    password: "Method123",
    database: "sn000001",
    connection: {
        search_path: "s0001v0000,s0000v0000",
    },
});

module.exports = sql;
