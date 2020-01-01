"use strict";

 module.exports.register = async server => {
  const fs = require('fs');
  const index = require("../../index");
  const mongoDbConnectionPool = index.mongoDbConnectionPool;
  const { Readable } = require('stream');
  const mongodb = require('mongodb');
  const ObjectID = require('mongodb').ObjectID;

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
              validate: {
                failAction: (request, h, err) => {
                  console.log("I am within failAction sir");
                  return error.isJoi() ? h.response(error.details[0]).takeover : h.response(error).takeover;
                },
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
                             console.log("======Mongo Db Object=======");
                             console.dir(db1);
                             const fileReturn = handleTrackUpload(file);

                             console.dir("fileReturn: " + fileReturn);
                             console.log("before succesfull return!");
                             return h.response("yes hello").code(200);
                             } catch ( err ) {
                               server.log( [ "error", "api", "track" ], err );
                               return h.response(h).code(501);
                             }
                           }
                         }
    } );

    server.route( {
          method: "GET",
          path: "/api/v1/tracks/{oid}",
          options: {
              validate: {
                failAction: (request, h, err) => {
                  console.log("I am within failAction sir");
                  return error.isJoi() ? h.response(error.details[0]).takeover : h.response(error).takeover;
                },
              },

          },
          handler: async(req, h) => {
                         try {
                               var dataChunk;
                               try {
                                      var trackID = new ObjectID(req.params.oid);
                                      console.log("trackOid: " + trackID);
                               } catch(err) {
                                      console.log("<----Error ecnountered Attempting to GET track----->");
                                      console.dir(err);
                                      return h.response(err).code(400);
                               }
                               //h.set('content-type', 'audio/mp3');
                               //h.set('accept-ranges', 'bytes');

                               let bucket = new mongodb.GridFSBucket(db2, {
                                  bucketName: 'tracks'
                                });

                                let downloadStream = bucket.openDownloadStream(trackID);

                                const data = downloadStream.on('data', (chunk) => {
                                    dataChunk = chunk;
                                });

                                downloadStream.on('error', () => {
                                    console.log("Error encountered in downloadStream");
                                });

                                const ret = downloadStream.on('end', (req, h) => {
                                    console.log("In download Stream");
                                    console.log("=================================");
                                    console.log("Track download completed successfully!");
                                    console.log("=================================");

                                });

                                console.dir(ret);
                                console.log("=================================");
                                console.dir(ret['s']['filter']['_id']['id']);
                                console.log("=================================");

                                return h.response(ret).code(200);
                               } catch ( err ) {
                                 server.log( [ "error", "api", "track" ], err );
                                 console.log("ERROR: " + err);
                                 return h.response(err).code(501);
                                 }
                             }

    } );

    const handleTrackUpload = file => {
      return new Promise((resolve, reject) => {
          var name = file.fileName;
          var groomedFileName = file.fileName.replace(/\"/g,"");

          try {
              // Covert buffer to Readable Stream
              const readableTrackStream = new Readable();
              readableTrackStream.push(file.data);
              readableTrackStream.push(null);
              console.log("<----Mongo Db Object in handlrackUpload---->")
              console.dir(db1);

              console.log("<------readableTrackStream--------->");
              console.dir(readableTrackStream);
              var bucket = new mongodb.GridFSBucket(db1, {
                    bucketName: 'tracks'
              });

              let uploadStream = bucket.openUploadStream(groomedFileName);
              let id = uploadStream.id;
              console.dir("mongo ID " + id);
              const result = readableTrackStream.pipe(uploadStream);

              uploadStream.on('error', () => {
                  console.log("UploadStream encounter an error!");
                  reject("ERROR Ecountered uploading track!");
              });

              uploadStream.on('finish', () => {
                    resolve("Fiile Uploaded Successfully!");
              });

              //return result;
          } catch (e) {
              console.log("<-------ERROR-------->");
              console.error(e);
              reject(e);
          }
      })
    }
};
