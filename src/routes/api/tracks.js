"use strict";

module.exports.register = async server => {
   server.route( {
       method: "GET",
       path: "/api/tracks/{oid}",
       config: {
           handler: async request => {
               try {
                   // get the sql client registered as a plugin
                   const db = request.server.plugins.sql.client;

                   // TODO: Get the current authenticate user's ID
                   const oid = request.params.oid;
                  if(typeof oid == 'undefined'){console.log("UNDEFINED FOR OID");}

                   // execute the query
                   const res = await db.tracks.getTracks(oid);

                   // return the recordset object
                   return res.recordset;
               } catch ( err ) {
                   console.log( err );
               }
           }
       }
   } );

   server.route( {
         method: "POST",
         path: "/api/tracks",
         config: {
             // auth: {
             //     strategy: "session",
             //     mode: "required"
             // },
             handler: async request => {
                 try {
                     const db = request.server.plugins.sql.client;
                     //const userId = request.auth.credentials.profile.id;
                     console.log(request.payload);
                     const { title, artist } = request.payload;
                     const res = await db.track.addTrack( { oid, title, description, track_id } );
                     return res.recordset[ 0 ];
                 } catch ( err ) {
                     server.log( [ "error", "api", "track" ], err );
                     return boom.boomify( err );
                 }
             }
         }
     } );

     server.route( {
         method: "DELETE",
         path: "/api/tracks/delete?oid={oid}",
         config: {
             // auth: {
             //     strategy: "session",
             //     mode: "required"
             // },
             response: {
                 emptyStatusCode: 204
             },
             handler: async request => {
                 try {
                     const oid = request.params.oid;
                     //const userId = request.auth.credentials.profile.id;
                     const db = request.server.plugins.sql.client;
                     const res = await db.track.deleteTrack( { oid } );
                     return res.rowsAffected[ 0 ] === 1 ? "" : boom.notFound();
                 } catch ( err ) {
                    console.log("Hello");
                     server.log( [ "error", "api", "track" ], err );
                     return boom.boomify( err );
                 }
             }
         }
     } );
};
