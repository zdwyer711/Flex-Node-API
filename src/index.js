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

       //console.log("Made it to startServer the mysql host is " + config.mysql.host)
       console.log("============================");
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
       console.log("============================");
       console.dir(config.mongodb.uri);

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
            console.log("<-----global.db1----->")
            console.dir(global.db1);
       // var client = mongoUtil.connectToServer( function( err, client ) {
       //   if (err) console.log(err);
       //   // start the rest of your app here
       //   console.log("Inside Mongo Util Connect to Server");
       //   console.dir(client);
       //   return client;
       // } );

       // const client = new MongoClient(config.mongodb.uri, {native_parser: true, useUnifiedTopology: true });
       // console.log("==========Mongo Db1 Obj==================");
       // console.dir(db1);
       // console.log("============Db2 Obj================");
       // console.dir(db2);
       // console.log("============================");
       //
       // const mongoDbConnectionPool = {
       //      db1: db1,
       //      db2: db2,
       // };
       // console.dir(mongoDbConnectionPool.db1);
       // // client.connect(function(error, database) {
       //     if(error){
       //       console.log("Error Conditional Reached within Connect");
       //       throw error;
       //     }
       //     // console.log("Mongo Client Connection Reached");
       //     // console.dir(database);
       //     const dbName = "FlexDb"
       //     const db = client.db(dbName);
       //     global.mongoDbConnection = db;
       //     console.log("========================");
       //     //console.dir(db);
       //     //mongoDbConnection = client.db(dbName);
       //     return db;
       //   });
       //   console.dir(db);

       // /**
       // * Connect Mongo Driver to MongoDB.
       // */
       // var mongoDatabase;
       // MongoClient.connect('mongodb://localhost/FlexDb', (err, database) => {
       //   if (err) {
       //     console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
       //     process.exit(1);
       //   }else {
       //     mongoDatabase = database;
       //     console.log("============================");
       //     console.log("Connected to MongoDb boi!");
       //     console.log("============================");
       //   }
       // });
      // console.log("Mongo Connection below");
       //console.dir(global.mongoDbConnection);
       console.log("============================");
       console.log("Connected to MySql Server!");
       console.log("============================");
       console.log( `Server running at http://${ config.host }:${ config.port }...` );
       //return mongoDbConnectionPool;
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

//const db = startServer();
//console.dir(db);
startServer();
// console.dir("db return from startServer() " + db);
// console.log("mySqlConnection: " + mySqlConnection);
// console.log("============Connection pool================");
// console.dir(db1);
// console.log("============================");
// console.dir(mongoDatabase);

// module.exports = {
//   mongoDbConnectionPool: mongoDbPool
// }








// let storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
//
// let upload = multer({storage: storage});
//
//
// imageApp.post('/api/v1/upload',upload.single('profile'), function (req, res) {
// message : "Error! in image upload."
//   if (!req.file) {
//       console.log("No file received");
//         message = "Error! in image upload."
//       res.render('index',{message: message, status:'danger'});
//
//     } else {
//       console.log('file received');
//       console.log(req);
//       var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
//
//               var query = db.query(sql, function(err, result) {
//                  console.log('inserted data');
//               });
//       message = "Successfully! uploaded";
//       res.render('index',{message: message, status:'success'});
//
//     }
// });
