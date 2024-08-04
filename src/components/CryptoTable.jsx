import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../components/cryptoStyle.css";
import { setSelectedCrypto, setCryptoRealTimeData, setStatus } from "../services/cryptoDataSlice";

const CryptoTable = () => {

    const isMountRef = useRef(false);
    const dispatch = useDispatch();
    const selectedCrypto = useSelector((state) => state.cryptoRealTimeData.selectedCrypto);
    const cryptoRealTimeData = useSelector((state) => state.cryptoRealTimeData.cryptoRealTimeData);
    const status = useSelector((state) => state.cryptoRealTimeData.status);

    useEffect(() => {
        if (!isMountRef?.current) {
            isMountRef.current = true;
            fetch('/api/insertCryptoRealTimePriceData', {
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            }).catch((error) => {
                console.log(error)
            });
        }
    }, []);
    useEffect(() => {
        let interval = setInterval(() => {
            if (selectedCrypto) {
                fetch(`/api/getSelectedCryptoData`, {
                    method: "POST",
                    body: JSON.stringify({
                        cryptoID: selectedCrypto
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async (response) => {

                    const cryptoData = await response.json();
                    dispatch(setCryptoRealTimeData(cryptoData?.result?.data));
                    dispatch(setStatus(true))

                }).catch((error) => {
                    console.log(error)
                });
            }
        }, [5000])
        return () => {
            clearInterval(interval);
        }

    }, [selectedCrypto])
    return (
        <>
            <div>
                <h1> Stocks Real Time Price Data </h1>
                <label>Select Crypto: </label>
                <select className='cursor-pointer' name="crypto" onChange={(e) => {
                    dispatch(setSelectedCrypto(e.target.value))
                    dispatch(setStatus(false))
                }}>
                    <option value="core">Core</option>
                    <option value="litecoin">Litecoin</option>
                    <option value="maker">Maker</option>
                    <option value="solana">Solana</option>
                    <option value="bitcoin">Bitcoin</option>
                </select>
            </div>

            <div className='tableDivStyle'>
            {(cryptoRealTimeData?.length > 0 && status) ?
                (

                    <table style={{ width: "100%"}} >
                        <thead>
                            <tr className='tableColoumStyle'>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>14d</th>
                                <th>30d</th>
                                <th>60d</th>
                                <th>200d</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoRealTimeData?.map((data, index) => {
                                return (
                                    <tr key={index} className='tableColoumStyle'>
                                        <td>{data?.name}</td>
                                        <td>{data?.symbol}</td>
                                        <td>{data?.market_data?.price_change_percentage_24h}</td>
                                        <td>{data?.market_data?.price_change_percentage_7d}</td>
                                        <td>{data?.market_data?.price_change_percentage_14d}</td>
                                        <td>{data?.market_data?.price_change_percentage_30d}</td>
                                        <td>{data?.market_data?.price_change_percentage_60d}</td>
                                        <td>{data?.market_data?.price_change_percentage_200d}</td>
                                        <td>{data?.market_data?.price_change_percentage_1y}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                ) : (
                    <div>Data Loading....</div>
                )
            }
            </div>
        </>
    )

}

export default CryptoTable


