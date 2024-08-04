import React from "react"
import { Provider } from "react-redux";
import { store } from "./app/store.js"
// import './App.css'
const CryptoRealTimeData = React.lazy(() => import('./pages/CryptoRealTimeData'))

function App() {

  return (
    <>
     <Provider store= {store}>
      <React.Suspense fallback={<>Data Loading....</>}>
      <CryptoRealTimeData />
      </React.Suspense>
     </Provider>
    </>
  )
}

export default App
