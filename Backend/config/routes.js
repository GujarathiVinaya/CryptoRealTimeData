import express from "express";
import cryptoController from "../app/controllers/cryptoController.js"

const route = express.Router();

route.get("/api/insertCryptoRealTimePriceData", cryptoController.insertCryptoRealTimePriceData);
route.post("/api/getSelectedCryptoData", cryptoController.getSelectedCryptoData)

  export default route;