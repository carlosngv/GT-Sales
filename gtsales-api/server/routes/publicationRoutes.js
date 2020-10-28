const { Router } = require("express");
const publicationRouter = Router();
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

publicationRouter.get("/allPublications", async (req, res) => {
  let query = `
        select * from publication
    `;
  let publications = await db.Open(query, [], false);
  let publicationArray = [];
  publications.rows.map((publication) => {
    publicationSchema = {
      publication_id: publication[0],
      product_id: publication[1],
      client_id: publication[2],
    };
    publicationArray.push(publicationSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(publicationArray);
});

publicationRouter.post(
  "/newPublication",
  upload.single("image"),
  async (req, res) => {
    const {
      client_id,
      product_name,
      product_detail,
      product_unit_price,
      product_category,
    } = req.body;

    const { path } = req.file;

    // Inserts product category

    let queryCategory = ` 
    insert into product_category(product_category_name) select :product_category from dual
    where not exists (select * from product_category where (product_category_name = :product_category))
  `;

    await db.Open(queryCategory, [product_category], true);

    // Inserts product

    let queryProduct = `
  insert into product (product_name, product_detail, product_unit_price, product_category, product_photo)
  SELECT :product_name, :product_detail, :product_unit_price, product_category.product_category_id, :path 
  FROM product_category where product_category_name = :product_category
  `;
    await db.Open(
      queryProduct,
      [
        product_name,
        product_detail,
        product_unit_price,
        path,
        product_category,
      ],
      true
    );

    // Gets product ID where path is the same as received.

    let queryIds = `
      select p.product_id, pc.product_category_id from product p inner join product_category pc on p.product_category = pc.product_category_id and
      p.product_name=:product_name and p.product_photo = :path 
      `;

    let productID = await db.Open(queryIds, [product_name, path], false);
    let idFound = 0;
    productID.rows.map((id) => {
      idFound = id[0];
    });
    console.log("ID:", idFound);

    let queryNewPublication = `
        insert into publication (product_id, client_id) values(:idFound, :client_id)
      `;
    await db.Open(queryNewPublication, [idFound, client_id], true);

    res.json({
      message: "OK!",
    });
  }
);

publicationRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  let query = `
        select pub.publication_id, pub.product_id, pub.client_id, c.client_name, p.product_name, p.product_detail,
        p.product_unit_price, p.product_photo from publication pub 
        join clientp c on pub.client_id = :id
        join product p on pub.product_id = p.product_id
    `;
  let publications = await db.Open(query, [id], false);
  let publicationArray = [];
  publications.rows.map((publication) => {
    publicationSchema = {
      publication_id: publication[0],
      product_id: publication[1],
      client_id: publication[2],
      client_name: publication[3],
      product_name: publication[4],
      product_detail: publication[5],
      product_unit_price: publication[6],
      product_photo: publication[7],
    };
    publicationArray.push(publicationSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(publicationArray);
});

publicationRouter.get("/publication/:publicationID", async (req, res) => {
  let { publicationID } = req.params;
  let query = `
        select pub.publication_id, pub.product_id, pub.client_id, c.client_name, p.product_name, p.product_detail,
        p.product_unit_price, p.product_photo from publication pub 
        join clientp c on pub.client_id > 0
        join product p on pub.product_id = p.product_id
        where pub.publication_id = :publicationID
    `;
  let publications = await db.Open(query, [publicationID], false);
  let publicationArray = [];
  publications.rows.map((publication) => {
    publicationSchema = {
      publication_id: publication[0],
      product_id: publication[1],
      client_id: publication[2],
      client_name: publication[3],
      product_name: publication[4],
      product_detail: publication[5],
      product_unit_price: publication[6],
      product_photo: publication[7],
    };
    publicationArray.push(publicationSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(publicationArray[0]);
});
module.exports = publicationRouter;
