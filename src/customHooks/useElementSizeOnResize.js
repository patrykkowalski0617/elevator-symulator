import { useLayoutEffect, useState } from "react";

export default function useElementSizeOnResize(el) {
    const [size, setSize] = useState([0, 0]);
    const [element, setElement] = useState(null);

    if (el && element === null) {
        setElement(el);
    }

    useLayoutEffect(() => {
        function updateSize() {
            if (element) {
                setSize([element.clientWidth, element.clientHeight]);
            }
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [element]);

    return size;
}
