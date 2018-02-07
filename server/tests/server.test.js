const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done ());
    //Todo.remove({}) wipes all of the todos that are already in the database
});

//beforeEach allows to run some code before every single test case and allows to set a database that is useful

describe('POST /todos', () => {
it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
             return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
            //fetches everything in that collection
        });
});

    it('should not create todo with invalid body data', (done) => {
       request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err, res) => {
        if(err) {
            return done(err);
        }
        
        Todo.find().then((todos) => {
            expect(todos.length).toBe(0);
            done();
        }).catch((e) => done(e));
       });
    });
});