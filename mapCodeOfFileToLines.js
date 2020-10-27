const fs = require('fs');
const object = {}
const array = fs.readFileSync('file1.js').toString().split("\n");
for(i in array) {
    object[i] = array[i]
}

console.log(object)
