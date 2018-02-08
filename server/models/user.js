const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    }, 
    password: {
        type: String,
        require: true,
        minlength: 6
    }, 
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

//schema lets you define new schema wihich allows to use unique method

                //user model
                // {
                //     email: 'agne@example.com',
                //     password: 'myPass123' instead we store 'afjkjrjscfdcfskf' - no plain text,
                //     tokens: [{
                //         access: 'auth', 
                //         token: 'pdgfigdhgfjdhjfjf' - an array
                //     }]
                // }

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); //'abc123' - secret value

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};
//important to use general function and not arrow function method because for this
//we need 'this' keyword and 'this' keyword does not work with arrow function

var User = mongoose.model('User', UserSchema); //{
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true,
//         unique: true,  //means doesn't have the same (email) value as someone else
//         validate: {
//             validator: validator.isEmail,
//             message: '{VALUE} is not a valid email'
//         }
//                     // another way to write validator is:
//                             //(value) => {
//                             //return validator.isEmail(value);
//                             //},
//     },
//     password: {
//         type: String,
//         require: true,
//         minlength: 6
//     },
//     tokens: [{
//         access: {
//             type: String,
//             require: true
//         },
//         token: {
//             type: String,
//             require: true
//         }
//     }]
// });

module.exports = {User};

                    // var newUser = new User({
                    //     email: 'vasagne@example.com',
                    // });

                    // newUser.save().then((doc) => {
                    //     console.log('Saved user', doc);
                    // }, (e) => {
                    //     console.log('Unable to save user', e)
                    // });