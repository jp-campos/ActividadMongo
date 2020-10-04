const WebSocket = require("ws");
const Message = require('./persistencia/messages-sql')
const [getMessages, getMessageByTS, insertMsg, deleteMsg, updateMsg] = require('./controlador/controlador')

const clients = [];
const messages = [];


const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      obj = JSON.parse(message)
      obj['ts'] = Date.now()
      
      insertMsg({author:obj.author, message:obj.message, ts:obj.ts})
      
      //messages.push(obj);
      
      sendMessages();
    });
  });

  const sendMessage = (msg) =>{
    //messages.push(msg)
    insertMsg({author:msg.author, message:msg.message, ts:msg.ts})
    sendMessages()
  }

  const sendMessages = () => {

    getMessages().then((result)=>{
      clients.forEach((client) => client.send(JSON.stringify(result)));  
    })

  };

  return sendMessage
};

exports.wsConnection = wsConnection;