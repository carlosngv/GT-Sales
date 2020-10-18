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
    console.log(client);
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
      client_verified: client[10],
    };
    clientArray.push(clientSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(clientArray);
});

clientRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  //query = `select * from clientp where client_id=:id`

  query = ` 
  select 
  client_id, client_name, client_lastname, client_username, client_password, client_email, client_birthday,
    client_profile_picutre, client_credits_qty, country.country_name, verified
    from clientp inner join 
    country on country_id = client_country and client_id=:id
  `

  let clients = await db.Open(query, {id}, false);
  clientSchema = {}
  clients.rows.map(client => {
    clientSchema = {
      client_id: client[0],
      client_name: client[1],
      client_lastname: client[2],
      client_username: client[3],
      client_password: client[4],
      client_email: client[5],
      client_birthday: (client[6]).toLocaleDateString(),
      client_profile_picture: client[7],
      client_credits_qty: client[8],
      client_country: client[9],
      client_verified: client[10],
    }
  })
  res.statusCode = 200;
  res.json(clientSchema);
});

clientRouter.post("/newClient", async (req, res) => {
  console.log(req.body);
  const {
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

  let query = `
    insert into clientp (client_name, client_lastname, client_username, client_password, client_email, client_birthday,
      client_profile_picutre, client_credits_qty, verified,client_country) 
      
      SELECT 
        :client_name, 
        :client_lastname, 
        :client_username, 
        :client_password, 
        :client_email, 
        :client_birthday, 
        'uploads/unknown.jpg', 
        10000,
        'false',
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
    client_country,
  });
});

clientRouter.get('/verify/:email', async (req, res) => {
  const {email} = req.params
  let query = "update clientp set verified='true' where client_email =:email";

  await db.Open(query, [email], true).then(res => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });

  res.status(200).json({
    message: 'Account successfully verified!'
  })

});


clientRouter.patch(
  "/updateClient",
  upload.single("image"),
  async (req, res) => {
    const {
      client_name,
      client_lastname,
      client_username,
      client_password,
      client_email,
      client_birthday,
      client_country,
    } = req.body;
    console.log(req.file);
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
    where client_email=:client_email
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

// Login
clientRouter.post("/signIn", async (req, res) => {
  const { client_email, client_password } = req.body;
  console.log(client_email, client_password);
  sql = `
    select client_id, client_name, client_lastname, client_username,
    client_password, client_email, client_birthday, client_profile_picutre,
    client_credits_qty, client_country, verified
    from clientp 
    where client_email=:client_email and client_password=:client_password
  `;

  let result = await db.Open(sql, [client_email, client_password], false);

  console.log(result.rows);

  if (result.rows.length > 0) {
    res.statusCode = 200;
    res.json({
      msg: "true",
      client: {
        client_id: result.rows[0][0],
        client_name: result.rows[0][1],
        client_lastname: result.rows[0][2],
        client_username: result.rows[0][3],
        client_password: result.rows[0][4],
        client_email: result.rows[0][5],
        client_birthday: result.rows[0][6],
        client_profile_picture: result.rows[0][7],
        client_credits_qty: result.rows[0][8],
        client_country: result.rows[0][9],
        client_verified: result.rows[0][10],
      }
      
    });
  } else {
    res.statusCode = 200;
    res.json({ msg: "false" });
  }
});
module.exports = clientRouter;
