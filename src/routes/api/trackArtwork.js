"use strict";


 module.exports.register = async server => {
  const multer = require('multer');
  server.route( {
        method: "POST",
        path: "/api/trackArtwork/",
        handler: async (request, h) => {
                try {
                    console.log("handler request reached!")
                    const { payload } = request
                    console.log("Payload reached!")
                    //const file = request.files;
                    const response = handleTrackArtworkUpload(payload.file)
                    console.log("Response reached!")

                    //return res.recordset[0];
                    return "Track Artowork Success!";
                } catch ( err ) {
                    server.log( [ "error", "api", "track" ], err );
                    return console.log("ERROR: " + err);
                }
            }
    } );

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

          // fs.writeFile('./upload/test.png', file, err => {
          // if (err) {
          //     reject(err)
          // }
          //     resolve({ message: 'Upload successfully!' })
          // })
        })
      }

};
