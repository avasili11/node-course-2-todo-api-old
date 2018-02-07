const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

   todo.save().then((doc) => {
    res.send(doc);
   }, (e) => {
    res.status(400).send(e);
   });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// for resource creations: '/todos'
// for getting creations: GET /todos

//crud operations - create, read, update and delete

// Get /todos/1234324 
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    //res.send(req.params);

    //Valid id using isValid with 404
    // 404 - send back empty send
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // query database using findById
        //success
            //if todo - send it back
            //if no todo - send back 404 with empty body
        //error
            //400 - and send empty body back

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

    //findById - creates id variable

app.delete('/todos/:id', (req, res) => {
//     //get the id
    var id = req.params.id;

//     //validate the id -> if not valid, return 404
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
//     //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
//         //success
//             // if no doc, send 404
        if(!todo) {
            return res.status(404).send();
        }
//             // if doc, send doc back with 200
        res.send({todo});
//             //error - 400 with empty body
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); 

if(!ObjectID.isValid(id)) {
    return res.status(404).send();
}

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};
