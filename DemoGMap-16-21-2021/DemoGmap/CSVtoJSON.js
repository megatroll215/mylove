const csvToJson = require("csv-file-to-json");
const dataInJSON = csvToJson({ filePath: "./coverage_holes_2021102207.csv" });
const fs = require("fs")
console.log(dataInJSON)

fs.writeFileSync("newData.json",JSON.stringify(dataInJSON),"utf-8");




