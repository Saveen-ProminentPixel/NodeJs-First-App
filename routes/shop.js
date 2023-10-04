const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  //   console.log("In another middleware!!");
  //   console.log(adminData.products);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", {
    prods: products,
    docTitle: "shop",
    path: "/",
    pageTitle: "Shop",
    hasProucts: products.length > 0,
  });
});

module.exports = router;
