import axios from 'axios';

const http = axios.create({
    baseURL: 'https://world.openfoodfacts.org/api/'
});

export const getProducts = async (barcode) => {
    // https://world.openfoodfacts.org/api/v0/product/${barcode}.json

    const response = await http.get(`v0/product/${barcode}.json`);
    return response.data;
}
