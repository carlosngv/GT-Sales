const fs = require('fs');

function generateHTML(details, total) {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/flatly/bootstrap.min.css" integrity="sha384-qF/QmIAj5ZaYFAeQcrQ6bfVMAh4zZlrGwTPY7T/M+iTTLJqJBJjwwnsE5Y0mV7QK" crossorigin="anonymous">
        <title>Detalle de la orden</title>
    </head>
    <body>
        <div class="container">
        <h2>Orden realizada con exito</h2>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Nombre del producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
  
              `;
  
      details.forEach((item) => {
      html += "<tr>";
      html += `<td>${item.product_name}</td>`;
      html += `<td>${item.product_unit_price}</td>`;
      html += `<td>${item.product_qty}</td>`;
      html += `<td>${item.subtotal}</td>`;
      html += "</tr>";
    });

    html += `
    <h1>TOTAL: ${total}</h1>
          </tbody>
                    </table>
                    </div>
              </body>
              </html>
              `;
  
    fs.writeFile("./public/orderMail.html", html, (error) => {
      if(error) {
        console.log(error);
      }
    });

  }
  
  module.exports = generateHTML;