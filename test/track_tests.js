var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:8080'),
    app = require('../src/index');

describe('User', function () {
    console.log("API var:" + api);
    var location1;
    var location2;
    var location3;
    var locations = [location1, location2, location3];

    console.log("Var app: " + app);

     before(function (done) {
            setTimeout(serverStarted,3000);
    //     try {
    //       app.startServer
    //       done();
    //     }
    //     catch(err){
    //       console.log("ERROR: " + err);
    //       return "Error encountered on server start: " + err;
    //     }
    //
    //     // .then(() => {
    //     //     done();
    //     // });
    //
    //
    //     // api.post('/locations')
    //     //     .set('Accept', 'application/x-www-form-urlencoded')
    //     //     .send({
    //     //         addressStreet: "222 Main St",
    //     //         addressCity: "Portland",
    //     //         addressState: "OR",
    //     //         addressZip: "97209",
    //     //         userId: 2
    //     //     })
    //     //     .expect('Content-Type', /json/)
    //     //     .expect(200)
    //     //     .end(function (err, res) {
    //     //         location2 = res.body;
    //     //     });
    //     //
    //     // api.post('/locations')
    //     //     .set('Accept', 'application/x-www-form-urlencoded')
    //     //     .send({
    //     //         addressStreet: "333 Main St",
    //     //         addressCity: "Portland",
    //     //         addressState: "OR",
    //     //         addressZip: "97209",
    //     //         userId: 3
    //     //     })
    //     //     .expect('Content-Type', /json/)
    //     //     .expect(200)
    //     //     .end(function (err, res) {
    //     //         location3 = res.body;
                function serverStarted(){
                    done();
                }
    //     //     });
   });

    it('should return a 200 response', function (done) {
        api.get('/api/tracks/2')
            .set('Accept', 'nodeDbConnector/json')
            .expect('POST Return Hit!')
            .expect(200)
            console.log("It Description reached...")
            done();
    });

     it('should insert a new track', function (done) {
    api.post('/api/tracks/add/77/Upset/Drake/1')
        .set('Accept', 'application/x-www-form-urlencoded')
        // .send({
        //     oid: 77,
        //     title: "Upset",
        //     artist: "Drake",
        //     track_id: 1
        // })
        .expect('Content-Type', /json/)
        .expect('POST Return Hit!')
        .expect(200)
        .end(function (err, res) {
            //location1 = res.body.payload;
            console.log("ERROR: " + err);
            console.log("location1: " + location1);
            });
            done();
        });

        // it('should return our inserted song', function (done) {
        //     const res = api.get('/api/tracks/77')
        //         .set('Accept', 'application/json')
        //         .expect('POST Return Hit!')
        //         .expect(200)
        //         .expect(res).to.have.property("title");
        //         //.end(function (err, res){
        //           //   expect(res.recordset).to.have.property("oid");
        //         //   expect(res.parms.oid).to.not.equal(null);
        //         //   console.log("Line 120: " + res);
        //         //   expect(res.body).to.have.property("title");
        //         //   expect(res.body.title).to.not.equal(null);
        //         //   expect(res.body).to.have.property("artist");
        //         //   expect(res.body.artist).to.not.equal(null);
        //         //   expect(res.body).to.have.property("track_id");
        //         //   expect(res.body.track_id).to.not.equal(null);
        //         //
        //         //     console.log("Error: " + err);
        //         //     console.log("Line 102: " + res);
        //         //});
        //           console.log("RES: " + res);
        //           done();
        //
        //
        // });


    it('should return the contents of track oid 77',  function(done){
      //  const res = api.get('api/tracks/77')
           api.get('api/tracks/77')
           .then(response => {
                assert(response.body.oid, '77')
            })
          //  .then((res) => {
          //   const body = res.body;
          //})
            // .set('Accept', 'application/json')
            //    .expect(200)

            //    .end(function (err, res) {
            //        expect(res).to.not.equal(null);
            //        expect(res).to.not.equal(undefined);
            //        console.log(res);
            // //     expect(res.recordset).to.have.property("oid");
            // //     expect(res.body).to.not.equal(null);
            // //     console.log("Line 120: " + res);
            // //     // expect(res.body).to.have.property("title");
            // //     // expect(res.body.title).to.not.equal(null);
            // //     // expect(res.body).to.have.property("artist");
            // //     // expect(res.body.artist).to.not.equal(null);
            // //     // expect(res.body).to.have.property("track_id");
            // //     // expect(res.body.track_id).to.not.equal(null);
                    done();
            //    });
    });

    it('should insert a new track', function (done) {
   api.delete('/api/tracks/77')
       .set('Accept', 'application/x-www-form-urlencoded')
       // .send({
       //     oid: 77,
       //     title: "Upset",
       //     artist: "Drake",
       //     track_id: 1
       // })
       .expect('Content-Type', /json/)
       .expect('Delete Return Hit!')
       .expect(200)
       .end(function (err, res) {
           //location1 = res.body.payload;
           console.log("ERROR: " + err);
           console.log("location1: " + location1);
           });
           done();
       });

    
    //
    // it('should have a 10 digit phone number', function (done) {
    //     api.get('/users/1')
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .end(function (err, res) {
    //             expect(res.body.phoneNumber.length).to.equal(10);
    //             done();
    //         });
    // });
    //
    // it('should have the role of admin', function (done) {
    //     api.get('/users/1')
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .end(function (err, res) {
    //             expect(res.body.role).to.equal("admin");
    //             done();
    //         });
    // });
    //
    // it('should be updated with a new name', function (done) {
    //     api.put('/users/1')
    //         .set('Accept', 'application/x-www-form-urlencoded')
    //         .send({
    //             name: "Kevin",
    //             email: "kevin@example.com",
    //             phoneNumber: "9998887777",
    //             role: "editor"
    //         })
    //         .expect(200)
    //         .end(function (err, res) {
    //             expect(res.body.name).to.equal("Kevin");
    //             expect(res.body.email).to.equal("kevin@example.com");
    //             expect(res.body.phoneNumber).to.equal("9998887777");
    //             expect(res.body.role).to.equal("editor");
    //             done();
    //         });
    // });
    //
    // it('should access their own locations', function (done) {
    //     api.get('/users/1/location')
    //         .set('Accept', 'application/x-www-form-urlencoded')
    //         .send({
    //             userId: 1
    //         })
    //         .expect(200)
    //         .end(function (err, res) {
    //             expect(res.body.userId).to.equal(1);
    //             expect(res.body.addressCity).to.equal("Portland");
    //             done();
    //         });
    // });
    //
    //
    // it('should not be able to access other users locations', function (done) {
    //     api.get('/users/2/location')
    //         .set('Accept', 'application/x-www-form-urlencoded')
    //         .send({
    //             userId: 1
    //         })
    //         .expect(401)
    //         .end(function (err, res) {
    //             if (err) return done(err);
    //             expect(res.error.text).to.equal("Unauthorized");
    //             done();
    //         });
    // });

});
