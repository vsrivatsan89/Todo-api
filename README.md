# Todo-api
Simple JSON API for managing TODOs
# Features:
 * GET /todos - returns list of todos matching the parameters passed.
 * GET /todos/:id - returns the todo with id provided
 * DELETE /todos/:id - deletes the todo with id provided if it exists
 * POST /todos/ - add todo given in the JSON body to the database
 * PUT /todos/:id - update todo at given id with the data provided in the body
 
# Testing
 * Testing is done via mocha and chai
 * Install mocha and execute 'npm test' to run the builtin 7 tests. They should test all the REST endpoints

