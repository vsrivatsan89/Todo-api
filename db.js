var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;
if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false
    });
} else if (env === 'testing') {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/testing-todo-api.sqlite',
        logging: false
    });

} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.sqlite',
        logging: false
    });

}

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;