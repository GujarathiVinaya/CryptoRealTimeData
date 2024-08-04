import React from 'react';
const CryptoTable = React.lazy(() => import('../components/CryptoTable'))

const CryptoRealTimeData = () => {

    return (
        <>
            <React.Suspense fallback={<>Data Loading....</>}>
                <CryptoTable />
            </React.Suspense>
        </>
    )

}

export default CryptoRealTimeData


