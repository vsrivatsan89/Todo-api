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
        chai.request(server).get('/todos').query({ completed: true, q: "Walk the dog" }).end(function(err, res) {

            res.should.have.status(200);
            var output = res.body;
            output[0].should.have.property('completed', true);
            output[0].should.have.property('description', "Walk the dog");
            done();




        });

    });

    it('get list of todos', function getListOfTodos(done) {


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


    it('get todos given an id', function getTodosGivenID(done) {

        chai.request(server).get('/todos').end(function(err, res) {

            res.should.have.status(200);
            var validID = res.body[0].id;
            chai.request(server).get('/todos/' + validID.toString()).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('id', validID);
                done();

            });


        });



    });

    it('delete todo given an id', function deleteTodoGivenID(done) {
        //delete a given todo with id and see the change in todos array length

        var todoListSizeBefore = -1;
        //update the todo with id given and see if the returned todo matches the update
        chai.request(server).get('/todos').end(function(err, res) {
            var todoListSizeBefore = -1;

            res.should.have.status(200);
            todoListSizeBefore = res.body.length;
            chai.request(server).delete('/todos/' + (todoListSizeBefore - 1).toString()).end(function(err, res) {
                res.should.have.status(200);
                chai.request(server).get('/todos').end(function(err, res) {
                    res.should.have.status(200);
                    var todoListSizeUpdated = res.body.length;
                    todoListSizeBefore.should.equal(todoListSizeUpdated + 1);
                    done();
                });
            })
        });
    });

    it('update todo with id given parameters', function updateTodo(done) {
        chai.request(server).get('/todos').end(function(err, res) {

            res.should.have.status(200);
            var validID = res.body[0].id;
            chai.request(server).put('/todos/' + validID.toString()).send({ "description": "test from chai" }).end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('id', validID);
                res.body.should.have.property('description', "test from chai");
                done();

            });


        });



    });





});