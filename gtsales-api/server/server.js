const express = require('express');
const morgan = require('morgan');
const app = express();
const clientRouter = require('./routes/clientRoutes');
const countryRoute = require('./routes/countryRoutes');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("Server listening on port", app.get('port'));
});


app.use('/clients', clientRouter); 
app.use('/countries', countryRoute); 

