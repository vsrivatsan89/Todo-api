var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var db = require('../db.js');

chai.use(chaiHttp);

describe('API:', function() {

    it('responds to / ', function testSlash(done) {
        chai.request(server).get('/').end(function(err, res) {
            res.should.have.status(200);
            res.text.should.equal('TODO API Root');
            done();



        })
    });

    it('add todo with parameters given', function addTodos(done) {
        var todo = {
            "description": "Walk the dog",
            "completed": true
        }

        chai.request(server).post('/todos').send(todo).end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property('description', todo.description);
            res.body.should.have.property('completed', todo.completed);
            done();

        });
    });




    it('get todos with parameters given', function getTodos(done) {
        //get todos with parameters given and see if the returned result match the criteria
       chai.request(server).get('/todos').query({completed:true,q:"Walk the dog"}).end(function(err,res){

            res.should.have.status(200);
            var output = res.body;
            output[0].should.have.property('completed',true);
            output[0].should.have.property('description',"Walk the dog");
            done();




       });

    });

    it('get list of todos', function getListOfTodos(done) {
        chai.request(server).get('/todos').end(function(err, res) {

            res.should.have.status(200);
            res.body.should.not.be.empty;
            done();

        });
    });


    it.skip('get todos given an id', function getTodosGivenID(done) {
        //search for id:1 and see if an object with that id is returned back and the return code is 200

    });

    it.skip('delete todo given an id', function deleteTodoGivenID(done) {
        //delete a given todo with id and see the change in todos array length

    });

    it.skip('update todo with id given parameters', function updateTodo(done) {

        //update the todo with id given and see if the returned todo matches the update

    });





});