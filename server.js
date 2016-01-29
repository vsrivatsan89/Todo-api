var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
var todos = [{
	id: 0,
	description: 'Water the garden',
	completed: false
},{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
},{
	id: 2,
	description: 'Meet Tara for lunch',
	completed: true
}];

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

app.listen(PORT,function () {
	console.log('Express listening on port: '+ PORT);
})