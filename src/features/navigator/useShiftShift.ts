import { useEffect, useRef } from 'react';

export const useShiftShift = (callback: () => void) => {
    const lastShiftTime = useRef(0);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Shift') {
                const now = Date.now();
                if (now - lastShiftTime.current < 500) {
                    callback();
                    lastShiftTime.current = 0;
                } else {
                    lastShiftTime.current = now;
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => lastShiftTime.current = 0, 500);
                }
            }
        };

        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [callback]);
};
