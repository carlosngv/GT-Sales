const { Router } = require("express");
const moment = require("moment");
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

    let queryPublicationID = ` 
        select publication_id from publication where client_id =:client_id and product_id = :idFound
    `;
    let publicationID = await db.Open(
      queryPublicationID,
      [client_id, idFound],
      false
    );
    let pubIDFound = 0;
    publicationID.rows.map((id) => {
      pubIDFound = id[0];
    });
    console.log(pubIDFound);

    let queryNewPublicationDetail = `
        insert into publication_detail (publication_id, likes_qty, dislikes_qty) values
        (:pubIDFound, 0, 0)
    `;
    await db.Open(queryNewPublicationDetail, [pubIDFound], true);

    res.json({
      message: "OK!",
    });
  }
);

publicationRouter.get("/others/:id", async (req, res) => {
  let { id } = req.params;
  let query = `
        select pub.publication_id, pub.product_id, pub.client_id, c.client_name, p.product_name, p.product_detail,
        p.product_unit_price, p.product_photo, pd.publication_detail_id, c.client_lastname from publication pub, product p, clientp c, publication_detail pd 
        where pub.product_id = p.product_id and pub.client_id != :id and c.client_id = :id and pd.publication_id = pub.publication_id
        
    `;

  /*     join clientp c on pub.client_id = :id
        inner join product p on pub.product_id = p.product_id */
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
      publication_detail_id: publication[8],
      client_lastname: publication[9]
    };
    publicationArray.push(publicationSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(publicationArray);
});

publicationRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  let query = `
        select pub.publication_id, pub.product_id, pub.client_id, c.client_name, p.product_name, p.product_detail,
        p.product_unit_price, p.product_photo, pd.publication_detail_id from publication pub, product p, clientp c, publication_detail pd 
        where pub.product_id = p.product_id and pub.client_id = :id and c.client_id = :id and pd.publication_id = pub.publication_id
        
    `;

  /*     join clientp c on pub.client_id = :id
        inner join product p on pub.product_id = p.product_id */
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
      publication_detail_id: publication[8]
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
        p.product_unit_price, p.product_photo, pd.likes_qty, pd.dislikes_qty, pd.publication_detail_id from publication pub 
        join clientp c on pub.client_id > 0
        join product p on pub.product_id = p.product_id
        join publication_detail pd on pd.publication_id = pub.publication_id
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
      likes_qty: publication[8],
      dislikes_qty: publication[9],
      publication_detail_id: publication[10]
    };
    publicationArray.push(publicationSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(publicationArray[0]);
});

publicationRouter.patch("/publication/updateLikes", async (req, res) => {
  const { likes, dislikes, publication_id } = req.body;
  let query = ` 
    update publication_detail set likes_qty = :likes, dislikes_qty=:dislikes where publication_id=:publication_id
  `;

  let currentStatus = 0;
  await db.Open(query, [likes, dislikes, publication_id], true).then(
    (res) => {
      console.log(res);
      currentStatus = 200;
    },
    (err) => {
      console.log(err);
      currentStatus = 400;
    }
  );

  res.status(currentStatus).json({
    message: "Information patched successfully!",
  });
});

publicationRouter.post("/publication/addComment", async (req, res) => {
  console.log(req.body);
  const {
    publication_comment_content,
    client_id,
    publication_detail_id,
  } = req.body;
  let query = `
 insert into publication_comment (publication_comment_content, client_id, publication_detail_id)
  values (:publication_comment_content, :client_id, :publication_detail_id)
 `;

 await db.Open(query, [publication_comment_content, client_id, publication_detail_id], true);

res.status(200).json({
      message: "OK!",
    });

});

publicationRouter.get("/publication/:id/comments", async (req, res) => {
  const { id } = req.params;
  let query = `
  select c.client_id, c.client_name, c.client_lastname, pc.publication_comment_content, pc.publication_comment_date, pc.publication_detail_id,
  c.client_profile_picutre 
  from clientp c, publication_comment pc where pc.client_id = c.client_id and pc.publication_detail_id = :id
  
  `; 
   let comments = await db.Open(query, [id], false);
  let commentArray = [];
  comments.rows.map((comment) => {
    let date = moment(comment[4])
    let commentSchema = {
      client_id: comment[0],
      client_name: comment[1],
      client_lastname: comment[2],
      publication_comment_content: comment[3],
      publication_comment_date: date.format("DD-MM-YYYY"),
      publication_detail_id: comment[5],
      client_profile_picture: comment[6]
    }
    commentArray.push(commentSchema);
  }); 
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    comments: commentArray
  })

});
module.exports = publicationRouter;
