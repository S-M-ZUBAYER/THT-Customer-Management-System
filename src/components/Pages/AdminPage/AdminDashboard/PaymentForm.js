import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';




function PaymentForm() {
    const [amount, setAmount] = useState(100); // Example amount in USD (100 = $1)
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("click");
        // Validate form data
        if (!amount || !email) {
            toast.error("Please provide both amount and email.");
            setLoading(false);
            return;
        }

        // Step 1: Create a Payment Intent on the backend
        try {
            const { data } = await axios.post('http://localhost:2000/tht/create-payment-intent', {
                amount,
                email,
            });

            const { clientSecret } = data;

            // Step 2: Confirm payment with Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            // Step 3: Handle errors or successful payment
            if (error) {
                toast.error(`Payment failed: ${error.message}`);
                setPaymentError(error.message);
                setLoading(false);
            } else if (paymentIntent.status === 'succeeded') {
                console.log("Payment successful:", paymentIntent);
                console.log(
                    email, paymentIntent.id
                );

                // Optionally, notify your backend to update payment status
                // await axios.post('http://localhost:5000/payment-success', {
                //     email,
                //     paymentStatus: 'completed',
                //     paymentIntentId: paymentIntent.id,
                // });
                toast.success('Payment successful!');
                setLoading(false);
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast.error("An error occurred while processing the payment.");
            setPaymentError("An error occurred while processing the payment.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Amount (USD):
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <CardElement />
            </div>

            {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}

            <button onClick={handleSubmit} className="cursor-pointer" type="submit" disabled={loading || !stripe || !elements}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}

export default PaymentForm;
