import axios from "axios";
let functions = {}

functions.insertCryptoRealTimePriceData = () => {
    return new Promise(async (resolve, reject) => {
        const stocks = ["core", "litecoin", "maker", "solana", "bitcoin"]
        setInterval(async () => {
            for (let stockId of stocks) {
                try {
                    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${stockId}?
                        x_cg_demo_api_key=CG-MVuZFecvQszY5RA8USLjqrLq`);
                    pricesDataCollection.insertOne(res.data, (err, response) => {
                        if (err) console.log(err)
                        resolve({
                            status: true,
                            message: "Stocks Inserted Successfully",
                            data: response
                        })
                    })

                } catch (err) {
                    reject({
                        status: false,
                        message: "Something went wrong",
                        data: err
                    })
                }
            }
        }, 2000);
    })
}

functions.getSelectedCryptoData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pricesDataCollection.find({
                id: data?.cryptoID
            }).project({
                symbol: 1,
                name: 1,
                "market_data.price_change_percentage_24h": 1,
                "market_data.price_change_percentage_7d": 1,
                "market_data.price_change_percentage_14d": 1,
                "market_data.price_change_percentage_30d": 1,
                "market_data.price_change_percentage_60d": 1,
                "market_data.price_change_percentage_200d": 1,
                "market_data.price_change_percentage_1y": 1

            }).sort({
                "_id": -1
            }).skip(0).limit(20).toArray((err, response) => {
                if (err) {
                    resolve({
                        statue: false,
                        data: []
                    })
                } else {
                    resolve({
                        status: true,
                        data: response
                    })
                }
            })
        } catch (err) {
            reject({
                status: false,
                error: "Something went wrong",
                data: []
            })
        }
    })
}

export default functions;