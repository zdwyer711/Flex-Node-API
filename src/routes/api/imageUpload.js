// var express = require('express')
//   , routes = express.Router()
//   , http = require('http')
//   , path = require('path')
//   , app = express()
//   , multer = require('multer')
//   , mysql      = require('mysql')
//   , bodyParser=require("body-parser");
const multer = require('multer');
const index = require("../../index");

//const app = mysql_server.app;
//const mySqlConnection = index.mySqlConnection;
const DIR = './uploads';

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
console.log("After let storage ");
let upload = multer({storage: storage});

console.log("==========");
console.log("mySqlConnection: " + index.mySqlConnection);
console.log("==========");

module.exports.register = async server => {
  //const mysql_server = require( "../../server" );


// server.post({
//       method:"",
//       path:,
//       Handler:,
// })


  // index.mySqlConnection.post('/api/v1/upload',upload.single('profile'), function (req, res) {
  //   message : "Error! in image upload."
  //     if (!req.file) {
  //         console.log("No file received");
  //           message = "Error! in image upload."
  //         res.render('index',{message: message, status:'danger'});
  //
  //       } else {
  //         console.log('file received');
  //         console.log(req);
  //         var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
  //
  //                 var query = index.mySqlConnection.query(sql, function(err, result) {
  //                    console.log('inserted data');
  //                 });
  //         message = "Successfully! uploaded";
  //         //res.render('index',{message: message, status:'success'});
  //
  //       }
  // });
}
