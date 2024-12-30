import React from 'react';

interface ScreenReaderAccessibleProps {
    liveRegionContent: string;
}

export const ScreenReaderAccessible: React.FC<ScreenReaderAccessibleProps> = ({ liveRegionContent }) => {
    return (
        <div
            aria-live="polite"
            role="region"
            className="sr-only"
            aria-atomic="true"
        >
            {liveRegionContent}
        </div>
    );
};
