import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ScreenReaderAccessible } from './ScreenReaderAccessible';

/**
 * Custom hook to manage live region content for screen reader accessibility.
 * This hook handles the focus, hover, and blur events, updating the live region content
 * and rendering it in a dedicated part of the DOM.
 *
 * The live region is dynamically added to the DOM and automatically updated when the content changes.
 *
 * @returns {Object} The hook's return object, containing methods to handle focus/hover and blur/leave events.
 * @returns {Function} handleFocusOrHover - Function to set the content that will be announced by the screen reader.
 * @returns {Function} handleBlurOrLeave - Function to clear the live region content when focus or hover is lost.
 */
export const useScreenReaderSupporter = () => {
    const [liveRegionContent, setLiveRegionContent] = useState<string>('');
    const rootRef = useRef<ReactDOM.Root | null>(null);
    /**
     * Sets the live region content when focus or hover occurs.
     *
     * @param {string} [content=''] - The content to be announced by the screen reader.
     */
    const handleFocusOrHover = (content?: string) => {
        setLiveRegionContent(content || '');  // Update live region content
    };

    /**
     * Clears the live region content when focus or hover leaves.
     *
     * @param {string} [content=''] - Optional content to reset or clear the live region.
     */
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
