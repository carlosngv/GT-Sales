const oracledb = require('oracledb');
cns = {
    user: "carlosngv",
    password: "1234",
    connectString:"localhost:3100/XE"
}

async function Open(sql, binds, autoCommit) {
    let connection = await oracledb.getConnection(cns);
    let result = await connection.execute(sql, binds, { autoCommit });
    connection.release();
    return result;
}


exports.Open = Open;