const fs = require("fs/promises");

const path = require("path");

const utils = {};

const data = {
  products: [],
};

utils.dataInMemory = data;

utils.loadDataInMemory = async () => {
  const baseDir = path.join(__dirname, "../src/");

  const productsPath = path.join(baseDir, "temp.json");

  const paths = [fs.readFile(productsPath, "utf-8")];

  console.log('Fetching data from json file ....')

  const [productsStr] = await Promise.all(paths);

  const productsData = JSON.parse(productsStr);

  data.products = productsData;

  utils.deepFreeze(data);
};

utils.deepFreeze = function (obj) {
  Object.freeze(obj);

  if (obj === undefined) {
    return obj;
  }

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === "object" || typeof obj[prop] === "function") &&
      !Object.isFrozen(obj[prop])
    ) {
      utils.deepFreeze(obj[prop]);
    }
  });
};


module.exports = utils;