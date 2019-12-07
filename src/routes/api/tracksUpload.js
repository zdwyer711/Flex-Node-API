"use strict";

 module.exports.register = async server => {
  const fs = require('fs');
  const index = require("../../index");
  const client = index.client;
  const { Readable } = require('stream');
  //const assert = require('assert');
  const mongodb = require('mongodb');
  server.route( {
        method: "POST",
        path: "/api/v1/tracksUpload",
         options: {
              payload: {
                      output: 'stream',
                      allow: ["Application/json",'application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
                      //timeout: false
                      maxBytes: 50000000,
              },
        },
        handler: {
          file: async(req, h) => {
                       try {
                             var payload = req['payload'];

                             var fileNameRegEx = /filename="(.*?)"/g;
                             var contentDispo = payload['profile']['hapi']['headers']['content-disposition'];
                             var result = fileNameRegEx.exec(contentDispo);

                             var fileName = result[1];
                             var mimeType = req['mime'];
                             var data = payload['profile']['_data'];

                             var groomedFileName = fileName.replace(/\"/g,"");
                             var fileDir = './trackArtwork/' + groomedFileName;
                             var groomedMimetype = mimeType.replace(/\"/g,"");
                             var fileDir = './trackArtwork/' + groomedMimetype

                             //var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + groomedFileName + "', '"+ groomedMimetype +"', '"+ JSON.stringify((data.byteLength/1024)) +"')";

                             var contentType = payload['profile']['hapi']['headers']['content-type'];
                             var encoding = payload['profile']['_encoding'];

                             var file = {
                               fileName : fileName,
                               mimeType : contentType,
                               encoding : encoding,
                               data : data,
                             };
                             console.log("======File Object=======");
                             console.dir(file);
                             const fileReturn = handleTrackUpload(file);
                             //
                             // var query = db.query(sql, function(err, result) {
                             //            if(err){
                             //              console.dir("ERROR: " + err);
                             //            } else {
                             //              console.log('inserted data');
                             //            }
                             // });
                           console.dir("fileReturn: " + fileReturn);
                           console.log("before succesfull return!");
                           return "Track Artowork Success!";
                           } catch ( err ) {
                               server.log( [ "error", "api", "track" ], err );
                               return console.log("ERROR: " + err);
                           }
             }
        }
    } );

    // server.route({
    //     method: 'GET',
    //     path: '/youngSoul.jpg',
    //     handler: function (request, h) {
    //       return h.file('./trackArtwork/youngSoul.jpg');
    //     }
    // });

    const handleTrackUpload = file => {
          var name = file.fileName;
          var groomedFileName = file.fileName.replace(/\"/g,"");
          try {
              // Covert buffer to Readable Stream
              const readableTrackStream = new Readable();
              readableTrackStream.push(file.data);
              readableTrackStream.push(null);
              console.log("<----Mongo Connection Object---->")
              console.dir(client);
              client.connect(function(error) {
                  //assert.ifError(error);
                  const dbName = FlexDb
                  const db = client.db(dbName);

                  var bucket = new mongodb.GridFSBucket(db);

                  readableTrackStream.pipe(bucket.openUploadStream(groomedFileName)).
                    on('error', function(error) {
                      assert.ifError(error);
                    }).
                    on('finish', function() {
                      console.log('done!');
                      process.exit(0);
                    });
                });
              // let bucket = new mongodb.GridFSBucket(mongoConnection, {
              //   bucketName: 'tracks'
              // });
              //
              // let uploadStream = bucket.openUploadStream(groomedFileName);
              // let id = uploadStream.id;
              // console.dir("mongo ID " + id);
              // readableTrackStream.pipe(uploadStream);
              //
              // uploadStream.on('error', () => {
              //   return res.status(500).json({ message: "Error uploading file" });
              // });
              //
              // uploadStream.on('finish', () => {
              //   return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
              // });
          } catch (e) {
              console.error(e);
          }
          //var fileDir = './trackUpload/' + groomedFileName;
          // fs.writeFile(fileDir, file.data, err => {
          //     if (err) {
          //         console.dir("ERROR" + err);
          //         reject(err)
          //     } else {
          //           resolve({ message: 'Upload successfully!' })
          //     }
          // })
      }

    // const handleTrackUpload = file => {
    //       return new Promise((resolve, reject) => {
    //       var name = file.fileName;
    //       var groomedFileName = file.fileName.replace(/\"/g,"");
    //
    //        // Covert buffer to Readable Stream
    //        const readableTrackStream = new Readable();
    //        readableTrackStream.push(file.data);
    //        readableTrackStream.push(null);
    //
    //        let bucket = new mongodb.GridFSBucket(mongoConnection, {
    //          bucketName: 'tracks'
    //        });
    //
    //        let uploadStream = bucket.openUploadStream(groomedFileName);
    //        let id = uploadStream.id;
    //        console.dir("mongo ID " + id);
    //        readableTrackStream.pipe(uploadStream);
    //
    //        uploadStream.on('error', () => {
    //          return res.status(500).json({ message: "Error uploading file" });
    //        });
    //
    //        uploadStream.on('finish', () => {
    //          return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    //        });
    //       //var fileDir = './trackUpload/' + groomedFileName;
    //       // fs.writeFile(fileDir, file.data, err => {
    //       //     if (err) {
    //       //         console.dir("ERROR" + err);
    //       //         reject(err)
    //       //     } else {
    //       //           resolve({ message: 'Upload successfully!' })
    //       //     }
    //       // })
    //     })
    //   }
};
