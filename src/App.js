import React, { useEffect, useMemo, useRef, useState } from "react";

import './App.css';
import { BrowserMultiFormatReader } from '@zxing/library';

function App() {
    const [data, setData] = useState(null);
    return (
        <div className="App">
            <header className="App-header">
                <BarcodeScanner onResult={(data) => {
                    console.log('result', data);
                    setData(data);
                }} />

                <p>
                    {data ? data.getText() : 'Scanning...'}
                </p>
            </header>
        </div>
    );
}

export const BarcodeScanner = ({
                                   onResult = () => {
                                   }, onError = () => {
    },
                               }) => {
    const { ref } = useZxing({ onResult, onError });
    return <video ref={ref}/>;
};

const useZxing = ({
                      constraints = { audio: false, video: { facingMode: 'environment', }, },
                      hints,
                      timeBetweenDecodingAttempts = 300,
                      onResult = () => {
                      },
                      onError = () => {
                      },
                  }) => {
    const ref = useRef(null);

    const reader = useMemo(() => {
        const instance = new BrowserMultiFormatReader(hints);
        instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
        return instance;
    }, [hints, timeBetweenDecodingAttempts]);

    useEffect(() => {
        if (!ref.current) return;
        reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
            if (result) onResult(result);
            if (error) onError(error);
        });
        return () => {
            reader.reset();
        };
    }, [ref, reader]);

    return { ref };
};
export default App;
