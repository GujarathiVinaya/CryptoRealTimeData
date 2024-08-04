import {MongoClient} from "mongodb"
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error("Failed to connect database", err);
    return;
  }
  console.log("Database connected successfully!");

  global.cryptodb = client.db("cryptoData")
  global.pricesDataCollection = cryptodb.collection("prices")
});
