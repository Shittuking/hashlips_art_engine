const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const basePath = process.cwd();
const buildDir = `${basePath}/build/jsons`;

const {
  additional_field,
  number_of_duplicates,
} = require(`${basePath}/src/config.js`);

const BASE_FILE = `${basePath}/base/base.json`;
const JSONS_FOLDER = buildDir;

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    rimraf.sync(buildDir);
  }
  fs.mkdirSync(buildDir);
};

const duplicate = () => {
  let base_data = JSON.parse(fs.readFileSync(BASE_FILE));
  for (let [field, value] of Object.entries(additional_field)) {
    base_data[field] = value;
    console.log(`Added ${field}`);
  }

  let base_data_string = JSON.stringify(base_data, null, 2);
  fs.writeFileSync(BASE_FILE, base_data_string);

  // Create duplicate JSON files
  let count = number_of_duplicates;
  for (i = 1; i <= count; i++) {
    let file_path = path.join(JSONS_FOLDER, `${i}.json`);
    fs.writeFileSync(
      file_path,
      JSON.stringify(base_data, null, 2).replace(/\*\*\*/g, `${i}`)
    );
    console.log(`Created ${i}.json`);
  }

  console.log(`Duplicated base data ${count} times`);
};

buildSetup();
duplicate();
