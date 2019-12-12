"use strict";
//var imageApp = express();
const config = require( "./config" );
const server = require( "./server" );
// const multer = require('multer');
// const mysql = require('mysql');

const {MongoClient} = require('mongodb');
var mysql = require('mysql');
const mongodb = require('mongodb');
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
       const client = new MongoClient(config.mongodb.uri, {native_parser: true, useUnifiedTopology: true });
       console.log("==========Client Obj in Index==================");
       console.dir(client);
       console.log("============================");
       client.connect(function(error, database) {
           if(error){
             console.log("Error Conditional Reached within Connect");
             throw error;
           }
           console.log("Mongo Client Connection Reached");
           console.dir(database);
           const dbName = "FlexDb"
           const db = client.db(dbName);
           global.mongoDbConnection = db;
           console.log("========================");
           //console.dir(db);
           //mongoDbConnection = client.db(dbName);
           return db;
         });
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
       console.log("Mongo Connection below");
       console.dir(global.mongoDbConnection);
       console.log("============================");
       console.log("Connected to MySql Server!");
       console.log("============================");
       console.log( `Server running at http://${ config.host }:${ config.port }...` );
       return client;
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

const client = startServer();

// console.log("mySqlConnection: " + mySqlConnection);

// console.dir(mongoDatabase);

module.exports = {
  client: client
}








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
