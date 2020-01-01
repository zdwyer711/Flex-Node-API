"use strict";
//var imageApp = express();
const config = require( "./config" );
const server = require( "./server" );
// const multer = require('multer');
// const mysql = require('mysql');

const {MongoClient} = require('mongodb');
var mysql = require('mysql');
const mongodb = require('mongodb');
var mongoUtil = require( './mongoUtil' );
var mongoDbConnection;

const startServer = async () => {
    try {
       // create an instance of the server application
       const app = await server( config );

       // start the web server
       await app.start();

       const connection = mysql.createConnection({
          host     : config.mysql.host,
          user     : config.mysql.user,
          password : 'Abletonlive!',
          database : 'flex',
          port     : 3306
        });

       connection.connect();
       global.db = connection;
       const mySqlConnection = connection;

       // First connection for slow operations
       const db1 = await mongodb.MongoClient.
          connect(config.mongodb.uri, {
              useNewUrlParser: true,
              poolSize: 1, // Only 1 operation can run at a time
              useUnifiedTopology: true
          }).
          then(client => client.db());

          // 2nd connection for fast operations
          const db2 = await mongodb.MongoClient.
            connect(config.mongodb.uri, {
                    useNewUrlParser: true,
                    poolSize: 1, // Only 1 operation can run at a time
                    useUnifiedTopology: true
            }).
            then(client => client.db());

            global.db1 = db1;
            global.db2 = db2;
            console.log("<-----global.db1----->")
            console.dir(global.db1);
            console.log("<-----global.db2----->")
            console.dir(global.db2);

       console.log("============================");
       console.log("Connected to MySql Server!");
       console.log("============================");
       console.log( `Server running at http://${ config.host }:${ config.port }...` );
       //return mongoDbConnectionPool;
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

startServer();

// module.exports = {
//   mongoDbConnectionPool: mongoDbPool
// }
