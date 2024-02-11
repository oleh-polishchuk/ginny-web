import { useEffect, useMemo, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const defaultConstrains = { audio: false, video: { facingMode: 'environment', }, };

export const useZxing = ({
                             constraints = defaultConstrains,
                             hints,
                             timeBetweenDecodingAttempts = 300,
                             onResult,
                             onError,
                         }) => {
    const ref = useRef(null);

    const reader = useMemo(() => {
        const instance = new BrowserMultiFormatReader(hints);
        instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
        return instance;
    }, [hints, timeBetweenDecodingAttempts]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
            if (result && typeof onResult === "function") {
                onResult(result);
            }
            if (error && typeof onError === "function") {
                onError(error);
            }
        });
        return () => {
            reader.reset();
        };
    }, [ref, reader, constraints, onResult, onError]);

    return { ref };
};
