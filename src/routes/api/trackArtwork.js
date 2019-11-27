"use strict";

 module.exports.register = async server => {
  const multer = require('multer');
  const fs = require('fs');

  const index = require("../../index");
  const mySqlConnection = index.mySqlConnection;
  const util = require('util');
  console.log("track Artwrok MySQLConnection: " + mySqlConnection);
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

  server.route( {
        method: "POST",
        path: "/api/v1/upload",
         options: {
              payload: {
                      output: 'stream',
                      //allow: 'multipart/form-data' // important
                      allow: ["Application/json",'application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
                      //timeout: false
              },
        },
        handler: {
          file: async(req, h) => {
                       try {
                         console.log('file received');
                         //const { payload } = req['payload'];
                        // const { headers} = req['headers'];
                        var payload = req['payload'];
                         //console.log(req);
                         console.dir(req);
                         console.dir("GIVE ME MY DAMN PAYLOAD " + req['payload']);
                         console.log(" ");
                         console.log(req['payload']);
                         console.log("===========================");
                         console.dir(payload['profile']);
                         //console.log("===========================");
                         //console.dir(req['payload']['porfile']['Readable']['_readableState']['readableState']);
                         //console.dir(req['payload']['porfile']['Readable']['_readableState']['readableState']);
                         //console.log("Return the damn payload!" + req.payload.profile.Readable._data);
                         //console.log("paylaod: " + util.inspect(payload, {showHidden: false, depth: null}));
                        // console.log("Hey douchebag you did it! " + payload.getOwnPropertyNames());
                        // var object = JSON.parse(payload);
                         // console.log("Request: " + req.payload);
                         // console.log("File: " + h.File);
                         console.log("===========================");
                         console.dir(payload['profile']['hapi']['filename']);
                         console.log("===========================");
                         console.log("===========================");
                         console.dir(payload['profile']['hapi']['headers']);
                         console.log("===========================");
                         //console.log("REQ Valus: " + Object.values(req));
                         var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + payload['profile']['hapi']['filename'] + "', '"+ payload.file.mimetype+"', '"+payload.file.size+"')";

                         var query = mySqlConnection.query(sql, function(err, result) {
                                    console.log('inserted data');
                         });

                       return "Track Artowork Success!";
                       } catch ( err ) {
                           server.log( [ "error", "api", "track" ], err );
                           return console.log("ERROR: " + err);
                         }
             }
        }
    } );

//   server.route({
//   path: '/api/v1/upload',
//   method: 'POST',
//   options: {
//        log: {
//          collect: true
//        },
//        payload: {
//             output: "stream",
//             //multipart: true,
//             //uploads: "C:\\Users\\18152\\Desktop\\projects\\nodeDbconnector",
//             // parse: true,
//             allow: ["Application/json",'application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
//             // maxBytes: 2 * 1000 * 1000,
//             timeout: false
//        }
//    },
//   handler: function(request, h) {
//     console.log("handler in track artwork reached.")
//     return new Promise((resolve, reject) => {
//       fs.writeFile('./trackArtwork/test.png', file, err => {
//          if (err) {
//            reject(err)
//          }
//          resolve({ message: 'Upload successfully!' })
//       })
//     })
//     // const { payload } = req
//     // const response = handleFileUpload(payload.file)
//     // return response
//   }
// })

    server.route({
        method: 'GET',
        path: '/youngSoul.jpg',
        handler: function (request, h) {
          return h.file('./trackArtwork/youngSoul.jpg');
        }
    });

    const handleFileUpload = file => {
 return new Promise((resolve, reject) => {
   fs.writeFile('./trackArtwork/test.png', file, err => {
      if (err) {
       reject(err)
      }
      resolve({ message: 'Upload successfully!' })
   })
 })
}

    const handleTrackArtworkUpload = file => {
          return new Promise((resolve, reject) => {
          console.log("handleTrackArtworkUpload reached!");

          if(file.mimetype === 'image/jpeg' || file.mimetype === 'img/png'){
            const trackArtworkuploads = multer({
                  storage: trackArtkworkStorage
            });
            const trackArtkworkStorage = multer.diskStorage({
                  destination: function(file, cb){
                      console.log("trackArtworkStorage Success!");
                      cb(null,'./trackArtwork/');
                  },
                  filename: function(file, cb){
                      cb(null, file.originalname)
                    }
            })
            resolve({message: 'Upload successfully!'})
          } else {
              reject({message: 'unable to upload file!'})
          }

          // fs.writeFile('./trackArtwork/test.png', file, err => {
          // if (err) {
          //     reject(err)
          // }
          //     resolve({ message: 'Upload successfully!' })
          // })
        })
      }

};
