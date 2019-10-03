"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "tracks" );

   const getTracks = async oid => {
       // get a connection to SQL Server
       const cnx = await getConnection();
      //console.log(cnx);
       // create a new request
       const request = await cnx.request();

       // configure sql query parameters
       request.input( "oid", sql.VarChar( 50 ), oid );

       // return the executed query
       return request.query( sqlQueries.getTracks );
   };
   const addTrack = async ( { oid, title, artist, track_id } ) => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "oid", sql.NChar([10]), oid );
       request.input( "title", sql.NVarChar( 200 ), title );
       request.input( "artist", sql.NVarChar( 200 ), description );
       request.input( "track_id", sql.VarChar( 50 ), track_id );
       return request.query( sqlQueries.addTrack );
   };

   const updateTrack = async ( { oid, title, artist, track_id } ) => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "oid", sql.NChar([10]), oid );
       request.input( "title", sql.NVarChar( 200 ), title );
       request.input( "artist", sql.NVarChar( 200 ), description );
       request.input( "track_id", sql.VarChar( 50 ), track_id );
       return request.query( sqlQueries.updateTrack );
   };

   const deleteTrack = async oid => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "oid", sql.NChar([10]), oid );
       return request.query( sqlQueries.deleteTrack );
   };

   return {
       addTrack,
       deleteTrack,
       getTracks,
       updateTrack
   };
};

module.exports = { register };
