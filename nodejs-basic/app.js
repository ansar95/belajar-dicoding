/** 
 * perinntah tidak jalan karena cuma di dalam node.js { process.env }
const server = new Server({
  host: ProcessingInstruction.env.NODE_ENV !== 'production' ? 'localhost' : 'dicoding.com',
});


//cek memory yang terpakai { process.memoryUsage() }.
const cpuInformation = process.memoryUsage();

console.log (cpuInformation);

//{ process.argv }
const firstName = process.argv[2];
const lastName = process.argv[3];

console.log(`Hello ${firstName} ${lastName}`);


const coffee = require('./lib/coffee');
console.log(coffee);
*/
const moment = require('moment');
 
const date = moment().format("MMMM Do YY");
console.log(date);


