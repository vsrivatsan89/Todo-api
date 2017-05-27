var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);
describe('/', () => {

	it('responds to / ', function testSlash(done) {
	chai.request(server).get('/').end(function(err , res){

		//response status code should be 200
		//response text should be "TODO API Root"
		res.should.have.status(200);
		res.text.should.equal('TODO API Root');
		done();



	})});



});

