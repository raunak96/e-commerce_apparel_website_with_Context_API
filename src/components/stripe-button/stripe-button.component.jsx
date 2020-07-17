import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceInPaise = price * 100;
  const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY;

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
      <StripeCheckout
          label="Pay Now"
          name="Rawn Apparels Ltd."
          billingAddress
          shippingAddress
          currency="INR"
          image="http://svgshare.com/i/CUz.svg"
          description={`Your grand Total is ₹ ${price}`}
          amount={priceInPaise}
          panelLabel="Pay Now"
          token={onToken}
          stripeKey={publishableKey}
      />
  );
};

export default StripeCheckoutButton;
