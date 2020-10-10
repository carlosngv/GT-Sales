const { Router } = require("express");
const router = Router();
const db = require("../config/db");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'./uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({ storage: storage });

router.get("/countries", async (req, res) => {
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

router.get("/clients", async (req, res) => {
  let query = "select * from clientp";
  let clients = await db.Open(query, [], false);
  clientArray = [];
  console.log(clients);
  clients.rows.map((client) => {
    let clientSchema = {
      client_id: client[0],
      client_name: client[1],
      client_lastname: client[2],
      client_username: client[3],
      client_password: client[4],
      client_email: client[5],
      client_birthday: client[6],
      client_profile_picture: client[7],
      client_credits_qty: client[8],
      client_country: client[9],
    };
    clientArray.push(clientSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(clientArray);
});

router.post("/newClient", upload.single('image'), async (req, res) => {

    const {
      client_name,
      client_lastname,
      client_username,
      client_password,
      client_email,
      client_birthday,
      client_credits_qty,
      client_country,
    } = req.body;

    const { path } = req.file;
    const newClient = {
      client_name: client_name ,
      client_lastname:client_lastname,
      client_username: client_username,
      client_password :client_password,
      client_email:client_email,
      client_birthday: client_birthday,
      client_profile_picture: path ,
      client_credits_qty: client_credits_qty,
      client_country: client_country,
    }
    console.log(newClient);
    let query = `
    insert into clientp (client_name, client_lastname, client_username, client_password, client_email, client_birthday,
      client_profile_picutre, client_credits_qty, client_country) 
      values 
      (
        :client_name, 
        :client_lastname, 
        :client_username, 
        :client_password, 
        :client_email, 
        :client_birthday, 
        :path, 
        :client_credits_qty,
        :client_country
        )
  `;
    await db.Open(
      query,
      [
        newClient.client_name,
        newClient.client_lastname,
        newClient.client_username,
        newClient.client_password,
        newClient.client_email,
        newClient.client_birthday,
        newClient.client_profile_picture,
        newClient.client_credits_qty,
        newClient.client_country,
      ],
      true
    ).then((res)=> {
      console.log(res);
      res.statusCode = 200;

    }, (err) => {
      console.log(err);
      res.statusCode = 500;

    });
    res.json(newClient);
  }
);

module.exports = router;
