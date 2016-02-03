var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

var PORT = process.env.PORT || 3000;
var todos = [];
var nextID = 0;

app.use(bodyParser.json());

app.get('/', function (req, res){
	res.send('TODO API Root');
} );

//GET /todos

app.get('/todos',function (req, res)
{
	var queryParams = req.query;
	var filteredTodos = todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos,{completed: true});
	}else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
		filteredTodos = _.where(filteredTodos,{completed: false});
	}

	res.json(filteredTodos);
});

app.get('/todos/:id', function (req,res){
	var todoID = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoID});
	
	
	if(matchedTodo)
	{
		res.json(matchedTodo);
	 
	}else
	{
		res.status(404).send();
	}

});

app.delete('/todos/:id', function (req, res){
	var todoID = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoID});
		todos = _.without(todos,matchedTodo);
	
	if(matchedTodo)
	{
		res.json(matchedTodo);
	 
	}else
	{
		res.status(404).send();
	}

});
//GET /todos/:id

//POST /todos/
app.post('/todos', function (req,res){
	var body = req.body;
	if(!_.isBoolean(body.completed)||!_.isString(body.description) || !body.description.trim().length > 0)
	{
		res.status(400).send();
	}else{
	body.description = body.description.trim();
	body = _.pick(body, 'description', 'completed');	
	body.id = nextID;
	nextID++;
	todos.push(body);
	res.json(body);
	}
});

app.put('/todos/:id', function (req,res){
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0)
	{
		validAttributes.description = body.description;
	}else if (body.hasOwnProperty('description')){
		return res.status(400).send();
	}
	var todoID = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if (matchedTodo){
		todos = _.without(todos,matchedTodo);
		_.extend(matchedTodo, validAttributes);
		todos.push(matchedTodo);
		res.json(matchedTodo);
	}else {
		return res.status(404).send();
	}

});

app.listen(PORT,function () {
	console.log('Express listening on port: '+ PORT);
})