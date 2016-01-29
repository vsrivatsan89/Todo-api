var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
	console.log('ID received: ' + todoID);
	for(i = 0; i < todos.length; i++)
	{
		if(todoID === todos[i].id)
		{
			res.json(todos[i]);
			
		}
	}
	 res.status(404).send();

});
//GET /todos/:id

//POST /todos/
app.post('/todos', function (req,res){
	var body = req.body;

	body.id = nextID;
	nextID++;
	todos.push(body);
	res.json(body);
});

app.listen(PORT,function () {
	console.log('Express listening on port: '+ PORT);
})