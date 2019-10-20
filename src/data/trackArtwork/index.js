"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "trackArtwork" );
   

   const addTrackArtwork = async ( { file } ) => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "file", sql.varbinary(MAX), file );
       // request.input( "title", sql.Text, title );
       // request.input( "artist", sql.Text, artist );
       // request.input( "track_id", sql.VarChar( 10 ), track_id );
       //return request.query( sqlQueries.addTrackArtwork );
       return true;
   };


   return {
       addTrackArtwork,
   };
};

module.exports = { register };
