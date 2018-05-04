// dependencies
// > yarn add csvtojson

// Usage:
// > node csv-to-json.js input.csv allNamesByYear.json
// const jsonFile = path.resolve(process.argv[3]);

const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const _ = require('lodash');
const csvFile = path.resolve('./baby-names.csv');
const stringSimilarity = require('string-similarity');


const allNamesByYear = [];
const girlNames = new Set();
const boyNames = new Set();


const male = {}
const female = {}
const years = {}

// do transformations and add to allNamesByYear array
function loadRow({ Name, Sex, Year, Count }) {
  let set;

  // Year Sex Name Count
  if (Sex === 'F') {
    set = female
    girlNames.add(Name)
  } else if (Sex === 'M') {
    boyNames.add(Name)
    set = male
  } else {
    console.log('No gender:', Name, Sex, Year, Count);
  }


  if (Year in years) {
    years[Year].total = years[Year].total + parseInt(Count)
  } else {
    years[Year] = {
      total: parseInt(Count)
    }
  }

  if (Name in set) {
    const n = set[Name];
    n.years[Year] = parseInt(Count);
    n.total = n.total + parseInt(Count);
  } else {
    set[Name] = {
      total: parseInt(Count),
      years: {
        [Year]: parseInt(Count)
      }
    }
  }

}


const logThing = () => {
  const unisex = new Set();

  allNamesByYear.forEach(({ Name }) => {
    if (girlNames.has(Name) && boyNames.has(Name)) {
      unisex.add(Name);
    }
  });

  console.log(`there are ${boyNames.size} boy names`);
  console.log(`there are ${girlNames.size} girl names`);
  console.log(`there are ${unisex.size} unisex names`);

}


const withSynonyms = (obj, i) => {

}

// write to file
function writeJson(err) {
if (err) { throw err; }

const _boyNames = [...boyNames]
const _girlNames = [...girlNames]
const unisexNames = _.intersection(_boyNames, _girlNames)

const isSynonym = (name1, name2) => {
  if (name1 === name2) { return false }
  if (name1[0] !== name2[0]) { return false }
  return stringSimilarity.compareTwoStrings(name1, name2) > 0.7
}

_girlNames.forEach(name => {
  const syns = _girlNames.filter(name2 => isSynonym(name, name2))
  if (syns.length > 0) {
    console.log(`[${ name }][${ syns.join(', ') }]`)
  }
})



const output = {
  male,
  female,
  years: years,
  names: {
    male: _boyNames,
    female: _girlNames,
    unisex: unisexNames,
  },
}

const content = JSON.stringify(output, null, 2);
fs.writeFile(`${csvFile}.json`, content, "utf8", function(err) {
  if (err) { throw err; }
  console.log(`Json file saved to ${csvFile}`);
});
}

// execute
csv()
  .fromFile(csvFile)
  .on("json", loadRow)
  .on("done", writeJson);
  // .on("done", logThing)



