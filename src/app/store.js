import {configureStore} from "@reduxjs/toolkit";
import  cryptoDataReducer  from "../services/cryptoDataSlice";

export const store = configureStore({
    reducer: {
        cryptoRealTimeData : cryptoDataReducer
    }
})