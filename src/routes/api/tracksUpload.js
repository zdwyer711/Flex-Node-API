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
              response: {
                      status: {
                          //500: 'There was an internal server error....I\'m sorry',
                          //200: 'You son of a bitch...you did it!',

                      },
                     // failAction: aynsc() => {
                     //
                     // }
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
                             return h;
                             } catch ( err ) {
                               server.log( [ "error", "api", "track" ], err );
                               return console.log("ERROR: " + err);
                             }
                           }
                         }
    } );

    server.route( {
          method: "GET",
          path: "/api/v1/tracks/{oid}",
        //  validate: {
          options: {
              validate: {
                failAction: (request, h, err) => {
                  console.log("I am within failAction sir");
                  return error.isJoi() ? h.response(error.details[0]).takeover : h.response(error).takeover;
                }
                // abortEarly: false,
                // payload: {
                //           output: 'stream',
                //           allow: ["Application/json",'application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
                //           //timeout: false
                //           maxBytes: 50000000,
                //   },
                //  response: {
                    // status: {
                      //     //500: 'There was an internal server error....I\'m sorry',
                      //     //200: 'You son of a bitch...you did it!',
                      //
                      // }
                      // status: function obj(){
                        //   return 'yes hello this is obj';
                    //  },
                      // failAction: (request, h, err) => {
                        //   const errorCodes = err.details
                        //   .map(e => e.context.errorCode)
                        //   .filter(e => e !== undefined)
                        //   throw Boom.badRequest(err.message, { errorCodes })
                        // },
                      },

              },
                //},
        //  },
          handler: async(req, h) => {
                         try {
                               var dataChunk;
                               try {
                                      var trackID = new ObjectID(req.params.oid);
                                      console.log("trackOid: " + trackID);
                               } catch(err) {
                                      //return h.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
                                      console.log("<----Error ecnountered Attempting to GET track----->");
                                      console.dir(err);
                               }
                               //h.set('content-type', 'audio/mp3');
                               //h.set('accept-ranges', 'bytes');

                               let bucket = new mongodb.GridFSBucket(db2, {
                                  bucketName: 'tracks'
                                });

                                let downloadStream = bucket.openDownloadStream(trackID);

                                const data = downloadStream.on('data', (chunk) => {
                                    //data = chunk;
                                    //h = chunk;
                                    dataChunk = chunk;
                                    return ;
                                });

                                downloadStream.on('error', () => {
                                    console.log("Error encountered in downloadStream");
                                });

                                const ret = downloadStream.on('end', (req, h) => {
                                    console.log("GET track complete!");
                                    console.log("====================");
                                    //console.dir(data);
                                    //return 'data: ${data}';
                                    //return { data: data};
                                    //return h.response(data).code(200);
                                    //h.end();
                                    //return data;
                                    console.log("In download Stream");
                                    console.log("=================================");
                                    console.dir(dataChunk);
                                    console.log("=================================");
                                    h = 'here I am motha fucker';
                                    //return h.response();
                                    //return dataChunk;
                                    //console.dir(h);
                                    //return h;
                                    //return 'Did this shit get returned!?';
                                  //  return h.response(dataChunk).code(201);
                                });
                                // console.log("====================");
                                // console.dir(data);
                                console.log("H return!");
                                console.dir("variable h: " + h);
                                console.dir("ret Value: " + ret);
                                console.dir(ret);
                                console.log("=================================");
                                console.dir(ret['s']['filter']['_id']['id']);
                                console.log("=================================");
                                //console.dir(data);
                                //console.log("=================================");
                                //console.dir(ret['s']['files']);


                                //return 'Did this shit get returned or what?';
                                return h.response(ret).code(201);
                               // return "Track GET Success!";
                               } catch ( err ) {
                                 server.log( [ "error", "api", "track" ], err );
                                 console.log("ERROR: " + err);
                                 //return h.status(401).json({ message: "Unable to return track"});
                               }
                             }

    } );

    const handleTrackUpload = file => {
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
                  return "ERROR Ecountered uploading track!";
              });

              uploadStream.on('finish', () => {
                    return "Fiile Uploaded Successfully!";
              });

              return result;
          } catch (e) {
              console.log("<-------ERROR-------->");
              console.error(e);
          }
      }
};
