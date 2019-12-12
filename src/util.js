"use strict";

// const Hapi = require( "hapi" );
// const plugins = require( "./plugins" );
// const routes = require( "./routes" );

const {MongoClient} = require('mongodb');
var mysql = require('mysql');
const mongodb = require('mongodb');

// const app = async config => {
//    const { host, port } = config;
//
//    // create an instance of hapi
//    const server = Hapi.server( { host, port } );
//
//    // store the config for later use
//    server.app.config = config;
//
//    // register plugins
//    await plugins.register( server );
//
//    // register routes
//    await routes.register( server );
//
//    return server;
// };


function handleTrackUpload(file) {
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
              const dbName = "FlexDb"
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
      } catch (e) {
          console.error(e);
      }
  }

module.exports = handleTrackUpload;
