const { Router } = require("express");
const chatRouter = Router();
const db = require("../config/db");
const moment = require("moment");

module.exports = chatRouter;

chatRouter.get("/messages/:id", async (req, res) => {
  const { id } = req.params;
  let query = `
    select m.chat_room_id, m.message_content, m.client_id, c.client_name, c.client_lastname,m.message_date   
    from message m, clientp c where m.chat_room_id = :id and c.client_id = m.client_id
    `;
  let messages = await db.Open(query, [id], false);
  let messagesArray = [];
  messages.rows.map((message) => {
    let date = moment(message[5])

    let messageSchema = {
      chat_room_id: message[0],
      message_content: message[1],
      client_id: message[2],
      client_name: message[3],
      client_lastname: message[4],
      chat_date: date.format("DD-MM-YYYY HH:mm"),
    };
    messagesArray.push(messageSchema);
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    messages: messagesArray,
  });
});


chatRouter.post('/room', async (req, res) => {
  const {client_one, client_two} = req.body;
  console.log('ENTRADA', req.body)
  let query = `
  select * from chat_room where (client_one = :client_one and client_two = :client_two) 
  or (client_one = :client_two and client_two = :client_one)
  `

  chatRoom = await db.Open(query, [client_one, client_two], false);
  let chatArray = []
  chatRoom.rows.map((chat) => {
    let chatSchema = {
      chat_room_id: chat[0],
      client_one: chat[1],
      client_two: chat[2]
    }
    chatArray.push(chatSchema);
  });

  res.status(200).json({
    chat_room: chatArray[0]
  })

});

chatRouter.post('/newRoom', async(req, res)=> {
  const {client_one, client_two} = req.body;
  console.log('ENTRADA', req.body)

  let query = ` 
  insert into chat_room(client_one, client_two) select :client_one, :client_two  from dual
  where not exists (select * from chat_room where (client_one = :client_one and client_two = :client_two) 
  or (client_one = :client_two and client_two = :client_one))
  `
  await db.Open(query, [client_one, client_two], true);

  res.status(200).json({
    message: 'Room successfully created!'
  })

});

chatRouter.get("/allMessages", async (req, res) => {
    let query = `
    select ch.client_one, c1.client_name, ch.client_two, c2.client_name, ch.chat_message from
    chat ch, clientp c1, clientp c2 where ch.client_one = c1.client_id and ch.client_two = c2.client_id
      `;
    let messages = await db.Open(query, [], false);
    let messagesArray = [];
    messages.rows.map((message) => {
      let messageSchema = {
        id_one: message[0],
        client_one: message[1],
        id_two: message[2],
        client_two: message[3],
        chat_message: message[4],
      };
      messagesArray.push(messageSchema);
    });
  
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      messages: messagesArray,
    });
  });
