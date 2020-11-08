const shoppingCartRouter = require('express').Router();
const db = require("../config/db");

shoppingCartRouter.post('/purchaseProduct', async (req, res) => {
    const { purchase_id, product_id, product_qty } = req.body;
    console.log(req.body)
    let newPurchaseDetail = `  
        insert into purchase_detail (product_id, purchase_id, product_qty, subtotal)  
        (select :product_id, :purchase_id, :product_qty, product_unit_price * :product_qty as subtotal 
        from product where product_id = :product_id)
    `
    await db.Open(newPurchaseDetail, [product_id, purchase_id,product_qty], true)
        .then(res => console.log(res), err => console.log(err));


    res.json({
        message: 'Successfully purchsed!'
    });
});

shoppingCartRouter.post('/newPurchase', async (req, res) => {
    const { client_id } = req.body;
    let newPurchase = ` 
        insert into purchase (client_id) values (:client_id)
    `
    await db.Open(newPurchase, [client_id], true).then((res) => {
        console.log(res);
    }, err => { console.log(err) });

    res.status(200).json({
        message: "Purchase ok!"
    });
});

shoppingCartRouter.get('/clientPurchases', async (req, res) => {

    let query = ` 
    select c.client_name, c.client_lastname, p.product_name, pd.purchase_id, pd.product_qty, pd.subtotal, p.product_unit_price
    from purchase_detail pd, product p, clientp c, purchase pu 
    where pd.purchase_id = pu.purchase_id
    and pd.product_id = p.product_id 
    and pu.client_id = c.client_id
    `

    let purchases = await db.Open(query, [], false);
    let purchasesArray = [];
    purchases.rows.map((purchase) => {
        let purchaseSchema = {
            client_name: purchase[0],
            client_lastname: purchase[1],
            product_name: purchase[2],
            purchase_id: purchase[3],
            product_qty: purchase[4],
            subtotal: purchase[5],
            product_unit_price: purchase[6]
        }
        purchasesArray.push(purchaseSchema);
    });

    res.status(200).json({
        purchases: purchasesArray
    })

});


shoppingCartRouter.get('/clientPurchases/:id', async (req, res) => { // Gets purchases from specific client
    const {id} = req.params
    let query = ` 
    select c.client_name, c.client_lastname, p.product_name, pd.purchase_id, pd.product_qty, pd.subtotal, p.product_unit_price
    from purchase_detail pd, product p, clientp c, purchase pu 
    where pd.purchase_id = pu.purchase_id
    and pd.product_id = p.product_id 
    and pu.client_id = :id
    and c.client_id = :id
    `

    let purchases = await db.Open(query, [id], false);
    let purchasesArray = [];
    purchases.rows.map((purchase) => {
        let purchaseSchema = {
            client_name: purchase[0],
            client_lastname: purchase[1],
            product_name: purchase[2],
            purchase_id: purchase[3],
            product_qty: purchase[4],
            subtotal: purchase[5],
            product_unit_price: purchase[6]

        }
        purchasesArray.push(purchaseSchema);
    });

    res.status(200).json({
        purchases: purchasesArray
    })

});

shoppingCartRouter.delete('/deletePurchases', async (req, res) => { // Puede simplificarse al unirse con la realización de la compra

    const { purchase_id } = req.body;

    let query = ` 
    delete from purchase_detail where purchase_id=:purchase_id
    `

    await db.Open(query, [purchase_id], true).then((res) => {
        console.log(res);
        res.statusCode = 200;
    }, err => {
        console.log(err);
        res.statusCode = 400;
    });

    res.setHeader('content-type', 'application/json');
    res.json({
        message: 'ok!'
    });

}); 


module.exports = shoppingCartRouter;