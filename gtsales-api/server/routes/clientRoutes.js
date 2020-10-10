const { Router } = require("express");
const clientRouter = Router();
const db = require("../config/db");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

clientRouter.get("/allClients", async (req, res) => {
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

clientRouter.post("/newClient", upload.single("image"), async (req, res) => {
  console.log(req.body);
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
  let queryCountry = ` 
  insert into country(country_name) select :client_country from dual
  where not exists (select * from country where (country_name = :client_country))
  `;
  await db.Open(queryCountry, [client_country], true);

  let query = `
    insert into clientp (client_name, client_lastname, client_username, client_password, client_email, client_birthday,
      client_profile_picutre, client_credits_qty, client_country) 
      
      SELECT 
        :client_name, 
        :client_lastname, 
        :client_username, 
        :client_password, 
        :client_email, 
        :client_birthday, 
        :path, 
        :client_credits_qty,
        country.country_id FROM country WHERE country_name = :client_country
  `;
  await db
    .Open(
      query,
      [
        client_name,
        client_lastname,
        client_username,
        client_password,
        client_email,
        client_birthday,
        path,
        client_credits_qty,
        client_country,
      ],
      true
    )
    .then(
      (res) => {
        console.log(res);
        res.statusCode = 200;
      },
      (err) => {
        console.log(err);
        res.statusCode = 500;
      }
    );
  res.json({
    client_name,
    client_lastname,
    client_username,
    client_password,
    client_email,
    client_birthday,
    path,
    client_credits_qty,
    client_country,
  });
});

clientRouter.patch(
  "/updateClient",
  upload.single("image"),
  async (req, res) => {


    const {
      client_id,
      client_name,
      client_lastname,
      client_username,
      client_password,
      client_email,
      client_birthday,
      client_country,
    } = req.body;


    let queryCountry = ` 
    insert into country(country_name) select :client_country from dual
    where not exists (select * from country where (country_name = :client_country))
    `;
    await db.Open(queryCountry, [client_country], true);


    const { path } = req.file;
    let query = `
    update clientp set
    client_name=:client_name, 
    client_lastname=:client_lastname,
    client_username=:client_username,
    client_password=:client_password,
    client_email=:client_email,
    client_birthday=:client_birthday,
    client_profile_picutre=:path,
    client_country = (select country_id from country where country_name=:client_coutnry)
    where client_id=:client_id
  `;

    await db
      .Open(
        query,
        [
          client_name,
          client_lastname,
          client_username,
          client_password,
          client_email,
          client_birthday,
          path,
          client_country,
          client_id,
        ],
        true
      )
      .then(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );

    res.status(200).json({
      client_id,
      client_name,
      client_lastname,
      client_username,
      client_password,
      client_email,
      client_birthday,
      path,
      client_country,
    });
  }
);

module.exports = clientRouter;
