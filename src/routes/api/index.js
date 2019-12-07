"use strict";

const tracks = require( "./tracks" );
const trackArtwork = require( "./trackArtwork" );
const tracksUpload = require( "./tracksUpload" );

module.exports.register = async server => {
  try{
        await tracks.register( server );
        await trackArtwork.register( server );
        await tracksUpload.register( server );
     }
      catch(err){
         console.log("Hey DUMBASS! " + err);
       }
};
