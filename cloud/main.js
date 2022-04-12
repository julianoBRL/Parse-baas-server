
console.log("Initilizing cloud loader...")

const fs = require('fs');

const jobsFolder = './cloud/jobs/';
const functionsFolder = './cloud/functions/';

console.log("Loading jobs ...")
fs.readdirSync(jobsFolder).forEach(file => {
    require("./jobs/"+file)
    console.log("./jobs/"+file+" loaded!")
});

console.log("Loading functions ...")
fs.readdirSync(functionsFolder).forEach(file => {
    require("./functions/"+file)
    console.log("./functions/"+file+" loaded!")
});

console.log("All cloud jobs/functions loaded!!")