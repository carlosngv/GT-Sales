const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const path = require('path');
const mailRouter = require('./mail/mail');
const app = express();
const clientRouter = require('./routes/clientRoutes');
const countryRoute = require('./routes/countryRoutes');
const productRouter = require('./routes/productRoutes');
const publicationRouter = require('./routes/publicationRoutes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("Server listening on port", app.get('port'));
});


app.use('/clients', clientRouter); 
app.use('/countries', countryRoute); 
app.use('/products', productRouter);
app.use('/publications', publicationRouter);

app.use('/uploads', express.static(path.resolve('uploads'))); // Important to locate images
app.use('/', mailRouter)
