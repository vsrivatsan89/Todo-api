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
	res.json(todos);
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

app.listen(PORT,function () {
	console.log('Express listening on port: '+ PORT);
})