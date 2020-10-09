const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/countries", async (req, res) => {
  let query = "select * from country";
  let countries = await db.Open(query, [], false);
  countryArray = [];
   countries.rows.map((country) => {
      let countrySchema = {
          "country_id": country[0],
          "country_name": country[1]
      }
      countryArray.push(countrySchema);
  }); 
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(countryArray)
});


router.get("/clients", async (req, res) => {
  let query = "select * from clientp";
  let clients = await db.Open(query, [], false);
  clientArray = [];
  clients.rows.map((client) => {
      let clientSchema = {
          "client_id": client[0],
          "client_name": client[1]
      }
      clientArray.push(clientSchema);
  }); 
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(clientArray)
});


module.exports = router;