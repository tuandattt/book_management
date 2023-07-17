var sql = require('mssql/msnodesqlv8');

var config = {
    server: "LAPTOP-97MURBIB\\SQLEXPRESS",
    user: "sa",
    password: "12345a",
    database: "Project_final",
    driver: "msnodesqlv8"
};

const conn = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});

module.exports = {
    conn : conn,
    sql : sql
} 