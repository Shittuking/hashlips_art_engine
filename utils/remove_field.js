const basePath = process.cwd();
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const buildDir = `${basePath}/build/jsons`;

const {
  fields_to_remove,
  number_of_duplicates,
} = require(`${basePath}/src/config.js`);

const BASE_FILE = `${basePath}/base/base.json`;
const JSONS_FOLDER = buildDir;

// read json data
let rawdata = fs.readFileSync(BASE_FILE);
let data = JSON.parse(rawdata);

fields_to_remove.map((field) => {
  try {
    delete data[field];
    console.log("Removed", field);
  } catch (err) {
    if (err instanceof ReferenceError) {
      console.log(
        `${field} field was not removed beacuse ${field} field was not present`
      );
    } else {
      console.log("Error occurred:", err);
    }
  }
});

fs.writeFileSync(`${basePath}/base/base.json`, JSON.stringify(data, null, 2));

if (fs.existsSync(buildDir)) {
  rimraf.sync(buildDir);
}
fs.mkdirSync(buildDir);

let count = number_of_duplicates;
for (i = 1; i <= count; i++) {
  let file_path = path.join(JSONS_FOLDER, `${i}.json`);
  fs.writeFileSync(
    file_path,
    JSON.stringify(data, null, 2).replace(/\*\*\*/g, `${i}`)
  );
}
