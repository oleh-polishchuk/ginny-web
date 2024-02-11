import React from "react";
import PropTypes from "prop-types";

import './index.css';

function Product({ status, name, image, code }) {
    return (
        <div className="product">
            <div className="product_status">
                <p className="product_status_text">Status: {status}</p>
            </div>
            <div className="product_content">
                <div className="product_preview">
                    <img className="product_image" src={image} alt={name}/>
                </div>
                <div className="product_data">
                    Name:
                    <h3 className="product_name">{name}</h3>
                    <div className="product_code">Code: {code}</div>
                </div>
            </div>
        </div>
    );
}

Product.propTypes = {
    status: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    code: PropTypes.string
}

Product.defaultProps = {
    status: '',
    name: '',
    image: '',
    code: ''
}

export default Product;
