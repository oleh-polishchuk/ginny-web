import axios from 'axios';

const http = axios.create({
    baseURL: 'https://world.openfoodfacts.org/api/'
});

const cache = {};

export const getProducts = async (barcode) => {
    if (cache[barcode]) {
        return cache[barcode];
    } else {
        const response = await http.get(`v0/product/${barcode}.json`);
        cache[barcode] = response.data;
        return response.data;
    }
}
