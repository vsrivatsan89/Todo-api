var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var db = require('../db.js');

chai.use(chaiHttp);

//we should start off as if there are no items in the todos database

describe('API:', () => {

    it('responds to / ', function testSlash(done) {
        chai.request(server).get('/').end(function(err, res) {

            //response status code should be 200
            //response text should be "TODO API Root"
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
            res.body.description.should.equal(todo.description);
            res.body.completed.should.equal(todo.completed);
            done();

        });
    });




    it('get todos with parameters given', function getTodos(done) {



    });

    it('get list of todos', function getListOfTodos(done) {

    });


    it('get todos given an id', function getTodosGivenID(done) {

    });

    it('delete todo given an id', function deleteTodoGivenID(done) {

    });

    it('update todo with id given parameters', function updateTodo(done) {

    });




});