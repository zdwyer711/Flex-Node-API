"use strict";

const ejs = require( "ejs" );
const inert = require( "inert" );
const { join } = require( "path" );
const vision = require( "vision" );

const auth = require( "./auth" );
const sql = require( "./sql" );

const isDev = process.env.NODE_ENV !== "production";

module.exports.register = async server => {
   // register plugins
   await server.register( [ inert, sql, vision ] );

   // configure ejs view templates
   const filePath = join( process.cwd(), "src" );
   server.views( {
       engines: { ejs },
       relativeTo: filePath,
       path: "views",
       layout: true
   } );

   // register authentication plugins
   await auth.register( server );
};
