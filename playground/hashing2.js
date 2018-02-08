// using jason web token

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// jwt.sign //signs user data and returns token value
// jwt.verify //takes token as a secret and makes sure it wasn't manipulated

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);