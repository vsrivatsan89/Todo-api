//test comment
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var PORT = process.env.PORT || 3001;
var todos = [];
var nextID = 0;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('TODO API Root');
});

//GET /todos
//this searches the todos list with the requested todo with criteria provided in the GET params
app.get('/todos', function(req, res) {
	var query = req.query;

	var where = {};

	if(query.hasOwnProperty('completed') && query.completed === 'true') {
		where.completed = true;
	}else if(query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}

	if(query.hasOwnProperty('q') &&  query.q.length > 0) {
		where.description = {
			$like: '%' + query.q +'%'
		};
	}

	db.todo.findAll({where: where}).then(function(todos){
		res.json(todos);

	}, function (e) {
		res.status(500).send();
	});
		


	
});

app.get('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id);

	db.todo.findById(todoID).then(function(todo) {
			if (!!todo) {
				res.json(todo.toJSON());
			} else {
				res.status(404).send();
			}

		},
		function(e) {
			res.status(500).send();

		});


});
//delete todos by id 
app.delete('/todos/:id', function(req, res) {

	var todoID = parseInt(req.params.id);

	db.todo.findById(todoID).then(function (todo) {
		if(!!todo) {
			db.todo.destroy({
				where: {
					id: todoID
				}
			}).then(function () {
				res.send("Deleted todo");
			});	
		} else {
			res.status(404).send();
		}

	}, function(e) {
		res.status(500).send();
	});
	

});
//GET /todos/:id

//This returns the list of todos
//POST /todos/
app.post('/todos', function(req, res) {
	var body = req.body;


	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}).catch(function(e) {
		res.status(400).json(e);
	});


});

//This updates the todo provided at id with the new put JSON data
app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'description', 'completed');
	var attributes = {};

	if (body.hasOwnProperty('completed')) {
		attributes.completed = body.completed;
	}

	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	}

	db.todo.findById(todoId).then(function(todo) {
		if (todo) {
			todo.update(attributes).then(function(todo) {
				res.json(todo.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});

});

db.sequelize.sync().then(function() {
	var server = app.listen(PORT, function() {
	});


});

module.exports = app;
