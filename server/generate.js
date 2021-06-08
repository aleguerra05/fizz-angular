//var faker = require('faker');
//finally i didn't need to use faker

var database = { numbers: []};

for (var i = 1; i <= 300; i++) {
  database.numbers.push({
    id: i,
    result: (i%15==0?'FizzBuzz':(i%3==0?'Fizz':(i%5==0?'Buzz':i)))
  });
}

console.log(JSON.stringify(database));