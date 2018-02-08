//hashing with crypto-js and SHA256

//hashing is used in many ways and places - hash is a way to overcome simple text
//you can convert password into hash and store it like that on your database

// const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data, //or data: 'data'
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

//             //example of a 'bad' person trying to illegaly change the data with no luck due to saltifying (putting secret message)
//             // token.data.id = 5;
//             // token.hash = SHA256(JSON.stringify(token.data)).toString();

//             //to make a hash foolproof - salting the hash means you add something on to the hash that is unique
//             //and what client does not know so he won't be able to manipulate it

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }