const { Router } = require("express");
const productRouter = Router();
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

productRouter.get("/allProducts", async (req, res) => {
  let query = `
        select * from product
    `;
  let products = await db.Open(query, [], false);
  productArray = [];
  products.rows.map((product) => {
    let productSchema = {
      product_id: product[0],
      product_name: product[1],
      product_detail: product[2],
      product_unit_price: product[3],
      product_category: product[4],
      product_photo: product[5]
    };
    productArray.push(productSchema);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(productArray);
});

productRouter.post("/newProduct", upload.single("image"), async (req, res) => {
  const {
    product_name,
    product_detail,
    product_unit_price,
    product_category,
  } = req.body;

  const { path } = req.file;

  let queryCategory = ` 
  insert into product_category(product_category_name) select :product_category from dual
  where not exists (select * from product_category where (product_category_name = :product_category))
  `;
  await db.Open(queryCategory, [product_category], true);

  let queryProduct = `
  insert into product (product_name, product_detail, product_unit_price, product_category, product_photo)
  SELECT :product_name, :product_detail, :product_unit_price, product_category.product_category_id, :path 
  FROM product_category where product_category_name = :product_category
  `;

  await db
    .Open(
      queryProduct,
      [
        product_name,
        product_detail,
        product_unit_price,
        path,        
        product_category,
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
    product_name,
    product_detail,
    product_unit_price,
    product_category,
    path,
  });
});

productRouter.patch(
  "/updateProduct",
  upload.single("image"),
  async (req, res) => {
    const {
      product_id,
      product_name,
      product_detail,
      product_unit_price,
      product_category
    } = req.body;

    const { path } = req.file;

    let queryCategory = ` 
  insert into product_category(product_category_name) select :product_category from dual
  where not exists (select * from product_category where (product_category_name = :product_category))
  `;
    await db.Open(queryCategory, [product_category], true);

    let productQuery = `
        update product set
        product_name = :product_name,
        product_detail = :product_detail,
        product_unit_price = :product_unit_price,
        product_category = (select product_category_id from product_category where product_category_name = :product_category),
        product_photo = :path
         where product_id = :product_id
    `;

    var currentStatus = 0;

    await db
      .Open(
        productQuery,
        [
          product_name,
          product_detail,
          product_unit_price,
          product_category,
          path,
          product_id
        ],
        true
      )
      .then(
        (response) => {
          console.log(response);
          currentStatus = 200;
        },
        (err) => {
          console.log(err);
          currentStatus = 400;

        }
      );

      res.status(currentStatus).json({
        product_id,
        product_name,
        product_detail,
        product_unit_price,
        product_category,
        path,
      });

  }
);

module.exports = productRouter;
