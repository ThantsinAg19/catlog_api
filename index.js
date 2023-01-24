const express = require("express");

const utils = require("./src/utils");

const app = express();

const port = 3000;

utils.loadDataInMemory();

app.get("/", (req, res) => {
  res.send("Hello world;");
});

app.get("/products", (req, res) => {
  try {
    const { skip, limit } = req.query;
    
    let [...products] = utils.dataInMemory.products;

    const total = products.length;

    if (skip > 0) {
      products = products.slice(skip);
    }

    if (products.length > limit) {
      products.length = limit;
    }

    const result = {
      products,
      total,
      skip,
      limit: products.length,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});
