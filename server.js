var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var PORT = process.env.PORT || 3000;
var todos = [];
var nextID = 0;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('TODO API Root');
});

//GET /todos

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

//POST /todos/
app.post('/todos', function(req, res) {
	var body = req.body;


	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}).catch(function(e) {
		res.status(400).json(e);
	});


});

app.put('/todos/:id', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}
	var todoID = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {
		id: todoID
	});

	if (matchedTodo) {
		todos = _.without(todos, matchedTodo);
		_.extend(matchedTodo, validAttributes);
		todos.push(matchedTodo);
		res.json(matchedTodo);
	} else {
		return res.status(404).send();
	}

});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port: ' + PORT);
	});

});