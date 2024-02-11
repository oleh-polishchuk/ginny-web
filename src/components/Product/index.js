import React from "react";
import PropTypes from "prop-types";

import './index.css';

function Product({ name, image, code }) {
    if (!name) {
        return (
            <div className="product">
                <p className="product_error">Product not found</p>
            </div>
        );
    }

    return (
        <div className="product">
            <div className="product_preview">
                <img className="product_image" src={image} alt={name}/>
            </div>
            <div className="product_data">
                <h2 className="product_name">{name}</h2>
                <p className="product_code">{code}</p>
            </div>
        </div>
    );
}

Product.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    code: PropTypes.string
}

Product.defaultProps = {
    name: '',
    image: '',
    code: ''
}

export default Product;
