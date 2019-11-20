"use strict";
var imageApp = express();
const config = require( "./config" );
const server = require( "./server" );
const multer = require('multer');

const startServer = async () => {
   try {
       // create an instance of the server application
       const app = await server( config );

       // start the web server
       await app.start();

       console.log( `Server running at http://${ config.host }:${ config.port }...` );

         let storage = multer.diskStorage({
           destination: function (req, file, callback) {
             callback(null, DIR);
           },
           filename: function (req, file, cb) {
             cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
           }
       });

       let upload = multer({storage: storage});


         imageApp.post('/api/v1/upload',upload.single('profile'), function (req, res) {
         message : "Error! in image upload."
           if (!req.file) {
               console.log("No file received");
                 message = "Error! in image upload."
               res.render('index',{message: message, status:'danger'});

             } else {
               console.log('file received');
               console.log(req);
               var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";

                       var query = db.query(sql, function(err, result) {
                          console.log('inserted data');
                       });
               message = "Successfully! uploaded";
               res.render('index',{message: message, status:'success'});

             }
       });
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

startServer();
