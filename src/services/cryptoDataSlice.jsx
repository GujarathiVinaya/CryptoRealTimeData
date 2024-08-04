import {createSlice} from "@reduxjs/toolkit";

export const cryptoDataSlice = createSlice({
    name: "cryptoRealTimeData",
    initialState: {
        selectedCrypto: "core",
        cryptoRealTimeData: [],
        status: true
    },
    reducers: {
        setSelectedCrypto: (state, action) => {
            state.selectedCrypto = action.payload
        },
        setCryptoRealTimeData: (state, action) => {
            state.cryptoRealTimeData = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },

    }

})
export const { setSelectedCrypto, setCryptoRealTimeData,setStatus} = cryptoDataSlice.actions;

export default cryptoDataSlice.reducer;