const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();


// Routes
const clientRouter = require('./routes/clientRoutes');
const countryRoute = require('./routes/countryRoutes');
const productRouter = require('./routes/productRoutes');
const publicationRouter = require('./routes/publicationRoutes');
const chatRouter = require('./routes/chatRoutes');
const shoppingCartRouter = require('./routes/shoppingCartRoutes');

// Socket
const serverHTTP = require('http').Server(app);
const io = require('socket.io')(serverHTTP);
const db = require("./config/db");


io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    socket.on('newMessage', async (data) => {
        socket.emit('newMessage', data);
        let chat_message = data.chat_message;
        let client_id = data.client_id;
        let chat_room_id  = data.chat_room_id;
        let query = ` 
            insert into message (message_content, client_id, chat_room_id) values
            (:chat_message, :client_id, :chat_room_id )
        `;
        await db.Open(query, [chat_message, client_id, chat_room_id], true).then(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );

        socket.broadcast.emit('newMessage', data);

    });

});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


app.set('port', process.env.PORT || 3000);
serverHTTP.listen(app.get('port'), () => {
    console.log("Server listening on port", app.get('port'));
});


app.use('/clients', clientRouter); 
app.use('/countries', countryRoute); 
app.use('/products', productRouter);
app.use('/publications', publicationRouter);
app.use('/chat', chatRouter);
app.use('/cart', shoppingCartRouter);


app.use('/uploads', express.static(path.resolve('uploads'))); // Important to locate images

