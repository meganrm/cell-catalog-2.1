import { debounce } from "lodash";
import { useState, useEffect } from "react";

const useWindowWidth = () => {
    const [width, SetWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            SetWidth(window.innerWidth);
        };
        const debouncedHandleResize = debounce(handleResize, 200);
        window.addEventListener("resize", debouncedHandleResize);
        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);
    return width;
};

export default useWindowWidth;
