"use strict";

const tracks = require( "./tracks" );

module.exports.register = async server => {
  try{
        await tracks.register( server );
      }
      catch(err){
        console.log("Hey DUMBASS! " + err);
      }
};
