import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../AdminPage/AdminDashboard/PaymentForm';

const ShowPaymentPage = () => {

    const stripePromise = loadStripe("pk_test_51M6UFaKxEUes1UmB03LtEzddUbWCCNcHzdfkQXm4Aj8SKF2Dq1yMvoJv4xS6fCDvzPsSvpdik1fNKjmJmUG9o89100EQqP2HNh");
    console.log(stripePromise);

    return (
        <div>
            Show Payment From to Complete The Payment
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
};

export default ShowPaymentPage;