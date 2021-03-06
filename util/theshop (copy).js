const sqlite3 = require('sqlite3').verbose();

// Variables
var exports = {};
var db = new sqlite3.Database('./shop.sqlite', exports.createTable);
var response;
var log = false;

exports.a = function()
{

}

module.exports = { // This uses chaining instead of serializing

    add: function(item, cost, description) {

        const getInfo = new Promise((resolve,error) => {



            function createDb() { // Root
                if (log) console.log('Creating Database Chain to store the userID money');
                db 
            }

            function createTable() { // Extends createDb
                db.run("CREATE TABLE IF NOT EXISTS shop (item TEXT, cost TEXT, description TEXT)", checkIfCreated);
            }

            function checkIfCreated() {
                if (log) console.log('Creating Table');
                db.get(`SELECT * FROM shop WHERE item = '${item}'`, function(err, row) {
                    if (!row) {
                        insertRows();
                    }
                    else {
                       response = row;
                       returnDb();
                    }
                })
            }

            function insertRows() { // Extends createTable
                var stmt = db.prepare("INSERT INTO shop (item,cost,description) VALUES (?,?,?)");

                stmt.run(item, cost, description);

                stmt.finalize(readAllRows);
            }

            function readAllRows() { // Extends insertRows

                /**db.all("SELECT rowid AS id, userID, money, lastDaily FROM moneyset", function(err, rows) { // This shows ALL rows
                    rows.forEach(function(row) {
                        console.log(row);
                    });
                    closeDb();
                });**/

                db.get(`SELECT * FROM shop WHERE item = '${item}'`, function(err, row) {
                    closeDb()
                })

            }

            function closeDb() { // Extends readAllRows
                checkIfCreated()
                db.close();
            }

            function returnDb() {
                return resolve(response)
            }

            function runChain() {
                createDb();
            }

            runChain();

        });

        return getInfo;

    },

    fetchBal: function(userID) {
        const getInfo = new Promise((resolve) => {
            // Variables
            var db;
            let response;
            let log = false; // TRUE or FALSE for logging what is happening in this file.

            function createDb() { // Root
                if (log) console.log('Creating Database Chain');
                db = new sqlite3.Database('./userMoney.sqlite', createTable);
            }

            function createTable() { // Extends createDb
                if (log) console.log('Creating Table');
                db.run("CREATE TABLE IF NOT EXISTS moneyset (userID TEXT, money INTEGER, lastDaily TEXT)", checkIfCreated);
            }

            function checkIfCreated() {
                db.get(`SELECT * FROM moneyset WHERE userID = '${userID}'`, function(err, row) {

                    if (!row) { // Run if row not found...
                        insertRows();
                    }
                    else { // Run if row found...
                        if (log) console.log('Row Found... Closing...')
                        response = row;
                        returnDb();
                    }

                })

            }

            function insertRows() { // Extends createTable
                if (log) console.log('Inserting Rows');
                var stmt = db.prepare("INSERT INTO moneyset (userID,money,lastDaily) VALUES (?,?,?)");

                stmt.run(userID, 0, 'Not Collected')

                stmt.finalize(readAllRows);
            }

            function readAllRows() { // Extends insertRows
                if (log) console.log('Display New Row');

                /**db.all("SELECT rowid AS id, userID, money, lastDaily FROM moneyset", function(err, rows) { // This shows ALL rows
                    rows.forEach(function(row) {
                        console.log(row);
                    });
                    closeDb();
                });**/

                db.get(`SELECT * FROM moneyset WHERE userID = '${userID}'`, function(err, row) {
                    response = row;
                    closeDb()
                })

            }

            function closeDb() { // Extends readAllRows
                if (log) console.log("Closing Database");
                db.close();
                returnDb();
            }

            function returnDb() {
                if (log) console.log(response)
                return resolve(response)
            }

            function runChain() {
                createDb();
            }

            runChain();

        });
        return getInfo;
    }

}
