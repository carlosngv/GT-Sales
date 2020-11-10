const reportsRouter = require("express").Router();
const { json } = require("express");
const db = require("../config/db");
const moment = require("moment");

reportsRouter.get("/topCredits", async (req, res) => {
  let query = ` 
    select client_name, client_lastname, client_email, client_birthday, client_credits_qty from clientp
    where rownum <=10 order by client_credits_qty desc
    `;

  result = await db.Open(query, [], false);
  let topArray = [];
  result.rows.map((item) => {
    let date = moment(item[3]);

    let itemSchema = {
      client_name: item[0],
      client_lastname: item[1],
      client_email: item[2],
      client_birthday: date.format("YYYY-MM-DD"),
      client_credits_qty: item[4],
    };
    topArray.push(itemSchema);
  });

  res.status(200).json({
    top: topArray,
  });
});

reportsRouter.get("/topPublications", async (req, res) => {
  let query = ` 
    select c.client_name, c.client_lastname, c.client_email, c.client_birthday, count(c.client_email) as products
    from clientp c, publication p
    where p.client_id = c.client_id and rownum <=10
    group by c.client_name, c.client_lastname, c.client_email, c.client_birthday
    order by products desc
    `;

  result = await db.Open(query, [], false);
  let topArray = [];
  result.rows.map((item) => {
    let date = moment(item[3]);

    let itemSchema = {
      client_name: item[0],
      client_lastname: item[1],
      client_email: item[2],
      client_birthday: date.format("YYYY-MM-DD"),
      products: item[4],
    };
    topArray.push(itemSchema);
  });

  res.status(200).json({
    top: topArray,
  });
});

reportsRouter.get("/topComplaints", async (req, res) => {
  let query = ` 
    select c.client_name, c.client_lastname, c.client_email, c.client_birthday, COUNT(c.client_id) as complaints
    from complaint co, clientp c 
    where co.client_id = c.client_id and rownum <=10
    group by c.client_name, c.client_lastname, c.client_email, c.client_birthday, c.client_id
    order by complaints desc
    `;

  result = await db.Open(query, [], false);
  let topArray = [];
  result.rows.map((item) => {
    let date = moment(item[3]);

    let itemSchema = {
      client_name: item[0],
      client_lastname: item[1],
      client_email: item[2],
      client_birthday: date.format("YYYY-MM-DD"),
      complaints: item[4],
    };
    topArray.push(itemSchema);
  });

  res.status(200).json({
    top: topArray,
  });
});

reportsRouter.get("/topLikes", async (req, res) => {
  let query = ` 
    select pd.likes_qty, p.product_name, c.client_name, c.client_lastname 
    from clientp c, publication pub, product p, publication_detail pd 
    where c.client_id = pub.client_id and pd.publication_id = pub.publication_id
    and p.product_id = pub.product_id and  rownum <=10 order by pd.likes_qty desc
    `;

  result = await db.Open(query, [], false);
  let topArray = [];
  result.rows.map((item) => {
    let itemSchema = {
      likes_qty: item[0],
      product_name: item[1],
      client_name: item[2],
      client_lastname: item[3],
    };
    topArray.push(itemSchema);
  });

  res.status(200).json({
    top: topArray,
  });
});

reportsRouter.get("/topDislikes", async (req, res) => {
  let query = ` 
    select pd.dislikes_qty, p.product_name, c.client_name, c.client_lastname 
from clientp c, publication pub, product p, publication_detail pd 
where c.client_id = pub.client_id and pd.publication_id = pub.publication_id
and p.product_id = pub.product_id and  rownum <=10 order by pd.dislikes_qty desc
    `;

  result = await db.Open(query, [], false);
  let topArray = [];
  result.rows.map((item) => {
    let itemSchema = {
      dislikes_qty: item[0],
      product_name: item[1],
      client_name: item[2],
      client_lastname: item[3],
    };
    topArray.push(itemSchema);
  });

  res.status(200).json({
    top: topArray,
  });
});

module.exports = reportsRouter;
