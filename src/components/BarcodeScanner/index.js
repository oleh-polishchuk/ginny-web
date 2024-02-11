import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useZxing } from "../../hooks/useZxing";
import './index.css';

export const BarcodeScanner = ({ onResult, onError, className }) => {
    const { ref } = useZxing({ onResult, onError });
    return (
        <div className={classNames('barcode-scanner', className)}>
            <video className="barcode-scanner_video" ref={ref}/>
        </div>
    );
};

BarcodeScanner.propTypes = {
    onResult: PropTypes.func,
    onError: PropTypes.func,
    className: PropTypes.string,
};

BarcodeScanner.defaultProps = {
    onResult: () => {
    }, onError: () => {
    },
    className: "",
};
