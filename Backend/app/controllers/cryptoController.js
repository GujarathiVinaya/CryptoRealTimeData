import cryptoService from "../services/cryptoService.js"
let functions = {}
functions.insertCryptoRealTimePriceData = async (req, res) => {
    try {
        let result = await cryptoService.insertCryptoRealTimePriceData(req)
        res.send({ status: true, result: result, message: "Success" })

    } catch (error) {
        res.send({ status: false, message: "Failed" })
    }
}

functions.getSelectedCryptoData = async (req,res) => {
    try{
        let result = await cryptoService.getSelectedCryptoData(req.body)
        res.send({status: true, result: result, message: "Success"})
    } catch (error) {
        res.send({ status: false, message: "Failed" })
    }
}

export default functions