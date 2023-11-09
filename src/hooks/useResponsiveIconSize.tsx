import { useState, useEffect } from 'react';

export default function useResponsiveIconSize() {
    const [size, setSize] = useState(18);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                setSize(15); // small screens
            } else if (window.innerWidth < 1024) {
                setSize(15); // medium screens
            } else {
                setSize(18); // large screens
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // call the function initially

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}
