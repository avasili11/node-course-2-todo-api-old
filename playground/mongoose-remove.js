const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}) - you can pass in an empty arguments to remove all the queries at once
//in this method we don't get info on the objects that got removed

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove - returns the doc with info about objects that got removed

Todo.findOneAndRemove({_id: '5a7b186bedd67a93b7a97452'}).then((todo) => {
     
 });

//Todo.findByIdAndRemove - removes by id and also returns the document

Todo.findByIdAndRemove('5a7b186bedd67a93b7a97452').then((todo) => {
    console.log(todo);
});