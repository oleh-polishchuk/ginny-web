import React, { useState } from "react";

import './App.css';
import { BarcodeScanner } from "./components/BarcodeScanner";
import { getProducts } from "./services/http";
import Product from "./components/Product";

let interval = null;

function App() {
    const [result, setResult] = useState(null);
    const [product, setProduct] = useState(null);
    const cleanResult = () => {
        if (interval) {
            clearInterval(interval);
        }
        interval = setTimeout(() => {
            setResult(null);
            setProduct(null);
        }, 5000);
    };

    const handleOnResult = (scanner) => {
        console.log(`1. Scan result: ${scanner.getText()}`);
        setResult(scanner.getText());

        console.log(`2. Get product: ${scanner.getText()}`);
        getProducts(scanner.getText())
            .then((data) => {

                console.log(`3. Product found: ${data.status_verbose}`);
                if (data && data.status_verbose === 'product found') {
                    setProduct({
                        name: data.product.product_name,
                        image: data.product.image_url,
                        code: data.product.code
                    });

                    console.log(`4. Clean result`);
                    cleanResult();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="app">
            <BarcodeScanner className="app_barcode-scanner" onResult={handleOnResult}/>

            <Product
                name={product && product.name}
                image={product && product.image}
                code={product && product.code}
            />

        </div>
    );
}

export default App;
