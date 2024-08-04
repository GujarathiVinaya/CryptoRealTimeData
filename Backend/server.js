import express from "express";
import bodyParser from "body-parser"
import "./config/dbConnections.js"
import route from "./config/routes.js"

const app = express()
const port = 8080
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use("/", route);

app.listen(port, () => {
  console.log(`server running on  ${port}`);
})


