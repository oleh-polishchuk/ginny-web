import React, { useEffect, useState } from "react";

import './App.css';
import { BarcodeScanner } from "./components/BarcodeScanner";
import { getProducts } from "./services/http";
import Product from "./components/Product";

let interval = null;

function App() {
    const [code, setCode] = useState('');
    const [product, setProduct] = useState(null);

    const handleOnResult = (scanner) => {
        console.log(`1. Barcode detected: ${scanner.getText()}`);
        if (interval) {
            console.log(`2. Clear interval`);
            clearInterval(interval);
        }
        console.log(`3. Set code`);
        setCode(scanner.getText());
        console.log(`4. Set interval`);
        interval = setTimeout(() => {
            console.log(`5. Clear code`);
            // setCode(null);
        }, 5000);
    };

    useEffect(() => {
        if (code) {
            getProducts(code)
                .then((data) => {
                    console.log(`6. Product found: ${data.status_verbose}`);
                    setProduct({
                        status: data.status_verbose,
                        name: data?.product?.product_name,
                        image: data?.product?.image_url,
                        code: data?.product?.code
                    });
                })
                .catch((error) => {
                    alert('Error: ' + error);
                });
        } else {
            console.log(`7. Clean product`);
            setProduct(null);
        }
    }, [code]);

    return (
        <div className="app">
            <BarcodeScanner className="app_barcode-scanner" onResult={handleOnResult}/>

            <Product
                status={product && product.status}
                name={product && product.name}
                image={product && product.image}
                code={product && product.code}
            />

        </div>
    );
}

export default App;
