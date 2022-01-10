import debounce from 'lodash/debounce';
import {useEffect, useState} from 'react';

function useWindowSize(delay = 100) {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        const debouncedHandleResize = delay
            ? debounce(handleResize, delay)
            : handleResize;
        debouncedHandleResize();
        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [delay]);

    return [windowSize.width, windowSize.height];
}

export default useWindowSize;
