"use strict";

 module.exports.register = async server => {
  const multer = require('multer');
  const fs = require('fs');

  server.route( {
        method: "POST",
        path: "/api/v1/upload",
         options: {
              payload: {
                      output: 'stream',
                      allow: ["Application/json",'application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
                      //timeout: false
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

                             var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + groomedFileName + "', '"+ groomedMimetype +"', '"+ JSON.stringify((data.byteLength/1024)) +"')";

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
                             const fileReturn = handleTrackArtworkUpload(file);

                             var query = db.query(sql, function(err, result) {
                                        if(err){
                                          console.dir("ERROR: " + err);
                                        } else {
                                          console.log('inserted data');
                                        }
                             });
                           console.log("before succesfull return!");
                           return "Track Artowork Success!";
                           } catch ( err ) {
                               server.log( [ "error", "api", "track" ], err );
                               return console.log("ERROR: " + err);
                           }
             }
        }
    } );

    server.route({
        method: 'GET',
        path: '/youngSoul.jpg',
        handler: function (request, h) {
          return h.file('./trackArtwork/youngSoul.jpg');
        }
    });

    const handleTrackArtworkUpload = file => {
          return new Promise((resolve, reject) => {
          var name = file.fileName;
          var groomedFileName = file.fileName.replace(/\"/g,"");
          var fileDir = './trackArtwork/' + groomedFileName;
          fs.writeFile(fileDir, file.data, err => {
              if (err) {
                  console.dir("ERROR" + err);
                  reject(err)
              } else {
                    resolve({ message: 'Upload successfully!' })
              }
          })
        })
      }
};
