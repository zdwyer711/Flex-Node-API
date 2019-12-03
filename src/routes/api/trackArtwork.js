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
  const DIR = '../../../uploads/';

  // let storage = multer.diskStorage({
  //     destination: function (req, file, callback) {
  //       console.log("diskStorage Reached!");
  //       callback(null, DIR);
  //     },
  //     filename: function (req, file, cb) {
  //       console.log("storage reached!")
  //       console.log("==================");
  //       console.dir(file);
  //       console.log("==================");
  //       console.dir(req);
  //       console.log("==================");
  //       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  //     }
  // });
  // console.log("After let storage ");
  // let upload = multer({storage: storage});

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
                         console.dir(payload['profile']['hapi']['headers']['content-disposition']);
                         console.log("===========================");
                         console.dir(payload['profile']['hapi']['headers']['content-disposition']['form-data']);
                         console.log("===========================");
                         var fileNameRegEx = /filename="(.*?)"/g;
                         var str = payload['profile']['hapi']['headers']['content-disposition'];
                         console.dir(str);
                         var result = fileNameRegEx.exec(str);
                         var result2 = str.match(fileNameRegEx);
                         console.dir(result2);
                         console.log("=====================");
                         console.log("Do I see a fileName!?");
                         console.dir(result[1]);
                         var fileName = result[1];
                         console.log("=====================");
                         //var newstr = str.match('filename=(.*?)');
                         // console.dir(result);
                         // var fileName = result[0];
                         // var fileNameRegEx = /"(.*?)"/g;
                         // var fileName = fileNameRegEx.exec(fileName);
                         console.log("=====================");
                         //console.dir(fileName);
                         console.dir(req['mime']);
                         var mimeType = req['mime'];
                         //console.dir(fileName[1]);
                         console.log("=====================");
                         //console.dir(mimeType);
                         console.log("=====================");
                         console.dir(payload['profile']['_data']);
                         console.log("=====================");
                         var data = payload['profile']['_data'];
                         console.dir(data.byteLength);
                         console.log("====File Info============");
                         console.log("File Name: " + fileName);
                         console.log("Mimetype: " + mimeType);
                         console.log("File Size: " + (data.byteLength/1024));
                         //console.log("REQ Valus: " + Object.values(req));
                         //console.dir(mySqlConnection);
                         fileName = JSON.stringify(fileName);
                         mimeType = JSON.stringify(mimeType);
                         var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + fileName + "', '"+ mimeType +"', '"+ JSON.stringify((data.byteLength/1024)) +"')";
                         console.log(sql);
                         console.log("====================");
                         var contentType = payload['profile']['hapi']['headers']['content-type'];
                         console.dir(contentType);
                         console.log("====================");
                         var encoding = payload['profile']['_encoding'];
                         console.dir(encoding);
                         var file = {
                           fileName : fileName,
                           mimeType : contentType,
                           encoding : encoding,
                           data : data,
                         };
                         console.log("======File Object=======");
                         console.dir(file);
                         const fileReturn = handleTrackArtworkUpload(file);
                         //upload.single('test');
                         console.log("After handleTrackArtworkUpload");
                         //console.dir(mySqlConnection);
                         var query = db.query(sql, function(err, result) {
                                    console.dir(err);
                                    console.dir(result);
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


  // let storage = multer.diskStorage({
  //     destination: function (req, file, callback) {
  //       console.log("diskStorage Reached!");
  //       callback(null, DIR);
  //     },
  //     filename: function (req, file, cb) {
  //       console.log("storage reached!")
  //       console.log("==================");
  //       console.dir(file);
  //       console.log("==================");
  //       console.dir(req);
  //       console.log("==================");
  //       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  //     }
  // });
  // console.log("After let storage ");
  // let upload = multer({storage: storage});



    server.route({
        method: 'GET',
        path: '/youngSoul.jpg',
        handler: function (request, h) {
          return h.file('./trackArtwork/youngSoul.jpg');
        }
    });

//     const handleFileUpload = file => {
//  return new Promise((resolve, reject) => {
//    fs.writeFile('./trackArtwork/test.png', file, err => {
//       if (err) {
//        reject(err)
//       }
//       resolve({ message: 'Upload successfully!' })
//    })
//  })
// }

    const handleTrackArtworkUpload = file => {
          return new Promise((resolve, reject) => {
          console.log("handleTrackArtworkUpload reached!");
          console.dir(file.mimeType);
          // if(file.mimeType == 'image/jpeg' || file.mimeType == 'img/png'){
          //   console.log("handleTrackArtworkUpload conditional has been met!");
          //   try {
          //     const trackArtkworkStorage = multer.diskStorage({
          //           destination: function(file, cb){
          //               console.log("trackArtworkStorage Success!");
          //               cb(null,'./trackArtwork/');
          //           },
          //           filename: function(file, cb){
          //               cb(null, file.fileName)
          //             }
          //     })
          //     const trackArtworkuploads = multer({
          //           storage: trackArtkworkStorage
          //     })
          //     resolve({message: 'Upload successfully!'})
          //   } catch(err){
          //     console.log("ERROR Caught!");
          //     console.dir(err);
          //   }
          //
          // } else {
          //     console.log("ERROR: Unable to upload file!");
          //     reject({message: 'unable to upload file!'})
          // }
          //let writeStream = fs.createWriteStream('testUpload.jpeg');

        // write some data with a base64 encoding
        //writeStream.write(file.data, file.encoding);
          var name = file.fileName;
          var groomedFileName = name.replace(/\"/g,"");
          var fileDir = './trackArtwork/' + groomedFileName;
          console.log("===================");
          console.dir(fileDir);
          fs.writeFile(fileDir, file.data, err => {
          if (err) {
              console.log("ERROR")
              console.dir(err);
              reject(err)
          }
              resolve({ message: 'Upload successfully!' })
          })
        })
      }

};
