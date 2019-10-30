"use strict";

 module.exports.register = async server => {
  const multer = require('multer');
  const fs = require('fs');

  // server.route( {
  //       method: "POST",
  //       path: "/api/trackArtwork/",
  //        config: {
  //             payload: {
  //                     //output: 'stream',
  //                     allow: 'multipart/form-data' // important
  //             },
  //       },
  //       handler:  {
  //                 file: function(reques, h) {
  //                             try {
  //                             console.log("handler request reached!")
  //                             // const { payload } = request
  //                             // console.log("Payload reached!")
  //                             const data = h.file(request.payload);
  //                             const file = data['trackArtwork'];
  //                             //const file = request.files;
  //                             //const response = handleTrackArtworkUpload(payload.file)
  //                             console.log("Response reached!")
  //                             //return res.recordset[0];
  //                             return "Track Artowork Success!";
  //                             } catch ( err ) {
  //                                 server.log( [ "error", "api", "track" ], err );
  //                                 return console.log("ERROR: " + err);
  //                               }
  //                   }
  //                 }
  //   } );

  server.route({
  path: '/upload',
  method: 'POST',
  config: {
       payload: {
           output: "stream",
           parse: true,
           allow: "multipart/form-data",
           //maxBytes: 2 * 1000 * 1000
       }
   },
  handler: function(request, h) {
    console.log("handler in track artwork reached.")
    return new Promise((resolve, reject) => {
      fs.writeFile('./trackArtwork/test.png', file, err => {
         if (err) {
           reject(err)
         }
         resolve({ message: 'Upload successfully!' })
      })
    })
    // const { payload } = req
    // const response = handleFileUpload(payload.file)
    // return response
  }
})

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
