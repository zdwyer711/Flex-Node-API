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
                   console.log(oid);
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
         path: "/api/tracks/{oid}/{title}/{artist}/{track_id}",
         config: {
             // auth: {
             //     strategy: "session",
             //     mode: "required"
             // },
             handler: async request => {
                 try {
                     const db = request.server.plugins.sql.client;
                     console.log("handler within POST reached");
                     //const userId = request.auth.credentials.profile.id;
                     console.log(request.payload);
                    // const { title, artist } = request.payload;
                     console.log("==Reached post==");
                     const oid = request.params.oid;
                     console.log("OID: " + oid);
                     const title = request.params.title;
                     console.log("Title: " + title)
                     const artist = request.params.artist;

                     const track_id = request.params.track_id;



                     const res = await db.tracks.addTrack( { oid, title, artist, track_id } );
                     //return res.recordset[ 0 ];
                     return "POST Return Hit!";
                 } catch ( err ) {
                     server.log( [ "error", "api", "track" ], err );
                     return boom.boomify( err );
                 }
             }
         }
     } );

     server.route( {
         method: "DELETE",
         path: "/api/tracks/{oid}",
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
                     console.log(oid);
                     //const userId = request.auth.credentials.profile.id;
                     const db = request.server.plugins.sql.client;
                     console.log("db: " + db);
                     console.log("oid:" + oid);
                     if(typeof oid == 'undefined' || oid == undefined){console.log("UNDEFINED FOR OID");}
                     const res = db.tracks.deleteTrack(oid);
                     if(typeof res == 'undefined' || res == undefined){console.log("res is undefined");}
                     console.log("RES: " + res);
                     //const resultRows = res.rowsAffected[ 0 ];
                     if(typeof resultRows == 'undefined' || resultRows == undefined){console.log("resultRows = undfined");}
                     return "Return Hit!";
                     //return res.rowsAffected[ 0 ] === 1 ? "" : boom.notFound();
                 } catch ( err ) {
                    console.log("ERROR: " + err);
                     server.log( [ "error", "api", "track" ], err );
                     // return boom.boomify( err );
                     return "Sucks...error encountered";
                 }
             }
         }
     } );
};
