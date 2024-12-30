import React from 'react';

/**
 * Props for the `ScreenReaderAccessible` component.
 * 
 * @interface ScreenReaderAccessibleProps
 * @property {string} liveRegionContent - The content that will be announced by screen readers when it changes.
 */
interface ScreenReaderAccessibleProps {
    /** The content to be announced by screen readers. */
    liveRegionContent: string;
}

/**
 * A component that provides live region content for screen readers.
 * It renders the content in a `div` with ARIA attributes to notify screen readers when the content changes.
 * 
 * This component is useful for updating live regions on the page, ensuring that the screen reader announces changes
 * to the user without interrupting their workflow.
 * 
 * @param {ScreenReaderAccessibleProps} props - The props for this component.
 * @returns {React.ReactElement} A `div` element with ARIA live region attributes.
 */
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
