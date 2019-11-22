"use strict";

const tracks = require( "./tracks" );
const trackArtwork = require( "./trackArtwork" );
const imageUpload = require("./imageUpload");

module.exports.register = async server => {
  try{
        await tracks.register( server );
        await trackArtwork.register( server );
        await imageUpload.register(server);
     }
      catch(err){
         console.log("Hey DUMBASS! " + err);
       }
};
