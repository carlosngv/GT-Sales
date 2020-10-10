const { Router } = require("express");
const countryRoute = Router();
const db = require("../config/db");



countryRoute.get("/", async (req, res) => {
    let query = "select * from country";
    let countries = await db.Open(query, [], false);
    countryArray = [];
    countries.rows.map((country) => {
      let countrySchema = {
        country_id: country[0],
        country_name: country[1],
      };
      countryArray.push(countrySchema);
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(countryArray);
  });


  module.exports = countryRoute;
