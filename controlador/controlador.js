
const mdbconn = require('../lib/utils/mongo.js');


function getMessages() {
  return mdbconn.conn().then((client) => {
    return client.db('actividadMongo').collection('mensajes').find({}).toArray();
  });
}

function getMessageByTS(id) {
    return mdbconn.conn().then((client) => {
      return client.db('actividadMongo').collection('mensajes').find({ts:id}).toArray();
    });
  }

function insertMsg(msg) {
  return mdbconn.conn().then((client) => {
    return client.db('actividadMongo').collection('mensajes').insertOne(msg); // Si no se provee un ID, este será generado automáticamente
  });
}


function deleteMsg(id){
    mu.conn.then((client) => {
        client.db("actividadMongo")
          .collection("mensajes")
          .deleteOne(
            { ts: id }
          )
        });
}

function updateMsg(id, msg){
    mu.conn().then((client) => {
        client.db("Population")
          .collection("cities")
          .updateOne(
            { ts: id }, // Filtro al documento que queremos modificar
            { $set: { msg } } // El cambio que se quiere realizar
          )
        });

}

module.exports = [getMessages, getMessageByTS, insertMsg, deleteMsg, updateMsg];