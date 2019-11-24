"use strict";

 module.exports.register = async server => {
  const multer = require('multer');
  const fs = require('fs');

  const index = require("../../index");
  const mySqlConnection = index.mySqlConnection;
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
                      timeout: false
              },
        },
        handler: {
          file: function(req, h) {
                       try {
                         console.log('file received');
                         const { payload } = req;
                         console.log("Request: " + payload);
                         console.log("File: " + payload.file);
                         var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";

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
