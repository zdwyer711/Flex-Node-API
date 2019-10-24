"use strict";

 module.exports.register = async server => {
  const multer = require('multer');
  const fs = require('fs');

  server.route( {
        method: "POST",
        path: "/api/trackArtwork/",
         config: {
              payload: {
                      output: 'stream',
                      allow: 'multipart/form-data' // important
              },
        },
        handler:  {
                  file: function(request) {
                              try {
                              console.log("handler request reached!")
                              // const { payload } = request
                              // console.log("Payload reached!")
                              const data = request.payload;
                              const file = data['trackArtwork'];
                              //const file = request.files;
                              //const response = handleTrackArtworkUpload(payload.file)
                              console.log("Response reached!")
                              //return res.recordset[0];
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
          return h.file('/trackArtwork/youngSoul.jpg');
        }
    });

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
