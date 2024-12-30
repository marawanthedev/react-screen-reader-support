# Screen Reader Supporter

**A React hook and component to improve accessibility for screen readers by announcing live region content dynamically.**

## Installation

To install the package in your project, run one of the following commands:

### Using npm:

```bash
npm install screen-reader-supporter


## Usage Examples

### Example 1: Basic Button with Screen Reader Support

This example shows how to use the `useScreenReaderSupporter` hook to announce messages when the user interacts with a button (hover or focus).

```tsx
import React from 'react';
import { useScreenReaderSupporter } from 'screen-reader-supporter';

const ButtonWithScreenReaderSupport = () => {
  const { handleFocusOrHover, handleBlurOrLeave } = useScreenReaderSupporter();

  return (
    <button
      onFocus={() => handleFocusOrHover('Button is focused')}
      onMouseEnter={() => handleFocusOrHover('Button is hovered')}
      onBlur={() => handleBlurOrLeave()}
      onMouseLeave={() => handleBlurOrLeave()}
    >
      Hover or Focus me
    </button>
  );
};


### Example 2: "Click to Pay" Button with Dynamic Status Announcements

This example demonstrates how to use the `useScreenReaderSupporter` hook to announce dynamic payment status updates during a click-to-pay process. The user will hear updates when the button is clicked, when the payment is being processed, and when the payment is complete.

```tsx
import React, { useState } from 'react';
import { useScreenReaderSupporter } from 'screen-reader-supporter';

const PaymentButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { handleFocusOrHover, handleBlurOrLeave } = useScreenReaderSupporter();

  const handlePayment = () => {
    setIsProcessing(true);
    handleFocusOrHover('Payment processing started. Please wait.');
    
    // Simulate payment process with a timeout
    setTimeout(() => {
      setIsProcessing(false);
      const paymentSuccess = Math.random() > 0.5; // Random success or failure
      if (paymentSuccess) {
        setIsSuccessful(true);
        handleFocusOrHover('Payment successful. Thank you for your purchase!');
      } else {
        setIsSuccessful(false);
        handleFocusOrHover('Payment failed. Please try again.');
      }
    }, 3000);
  };

  return (
    <div>
      <button
        onFocus={() => handleFocusOrHover('Click to pay, proceed with checkout')}
        onMouseEnter={() => handleFocusOrHover('Click to pay, proceed with checkout')}
        onBlur={() => handleBlurOrLeave()}
        onMouseLeave={() => handleBlurOrLeave()}
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing Payment...' : 'Click to Pay'}
      </button>
      
      {/* Display additional information for screen reader */}
      <p>
        {isProcessing ? 'Please wait while we process your payment.' : ''}
        {isSuccessful ? 'Thank you for your purchase!' : ''}
        {!isSuccessful && !isProcessing ? 'Payment failed, please try again.' : ''}
      </p>
    </div>
  );
};

export default PaymentButton;

