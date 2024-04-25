const sqliteConnection = require("../../sqlite3");
const createUsers = require('./createUser');

async function migrationRun(){
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(err => console.log(err)) 
}

module.exports = migrationRun;