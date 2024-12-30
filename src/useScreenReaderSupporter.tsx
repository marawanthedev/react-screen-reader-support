import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ScreenReaderAccessible } from './ScreenReaderAccessible';

export const useScreenReaderSupporter = () => {
    const [liveRegionContent, setLiveRegionContent] = useState('');
    const rootRef = useRef<ReactDOM.Root | null>(null);

    const handleFocusOrHover = (content?: string) => {
        setLiveRegionContent(content || '');
    };

    const handleBlurOrLeave = (content?: string) => {
        setLiveRegionContent(content || '');
    };

    useEffect(() => {
        const liveRegionContainer = document.createElement('div');
        liveRegionContainer.setAttribute('id', 'screen-reader-supporter');
        document.body.appendChild(liveRegionContainer);

        rootRef.current = ReactDOM.createRoot(liveRegionContainer);

        return () => {
            if (rootRef.current) {
                rootRef.current.unmount();
            }
            document.body.removeChild(liveRegionContainer);
        };
    }, []);

    useEffect(() => {
        if (rootRef.current && liveRegionContent) {
            rootRef.current.render(
                <ScreenReaderAccessible liveRegionContent={liveRegionContent} />
            );
        }
    }, [liveRegionContent]);

    return {
        handleFocusOrHover,
        handleBlurOrLeave,
    };
};
