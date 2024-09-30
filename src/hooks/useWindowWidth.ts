import { debounce } from "lodash";
import { useState, useEffect } from "react";

const useWindowWidth = () => {
    // so the build doesn't fail
    if (typeof window === "undefined") {
        return 0;
    }
    const [width, SetWidth] = useState(window.innerWidth);

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
