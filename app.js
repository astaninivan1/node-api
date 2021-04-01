const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const mongoClient = new MongoClient('mongodb://localhost:27017/', {useUnifiedTopology: true});
mongoClient.connect((err, client) => {
   const db = client.db("usersdb");
   const collection = db.collection("users");
   let user = {name: "Tom", age: 23};
   collection.insertOne(user, function(err, result){

      if(err){
         return console.log(err);
      }
      console.log(result.ops);
      client.close();
   });
});

app.get('/', (req, res) => {
   res.send('<h1>Hello</h1>')
});
app.listen(3000);
