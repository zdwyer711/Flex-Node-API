"use strict";

const tracks = require( "./tracks" );
const trackArtwork = require( "./trackArtwork" );

module.exports.register = async server => {
  try{
        await tracks.register( server );
        await trackArtwork.register( server );
     }
      catch(err){
         console.log("Hey DUMBASS! " + err);
       }
};
