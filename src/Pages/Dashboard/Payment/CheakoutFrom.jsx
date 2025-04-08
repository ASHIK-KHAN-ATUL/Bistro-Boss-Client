import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseCart from '../../../Hooks/UseCart'
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheakoutFrom =  () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId ] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure =  UseAxiosSecure();
    const {user} = UseAuth();
    const [cart, refetch] = UseCart();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total , item) => total + item.price, 0)

    useEffect( () => {
      if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', {price : totalPrice})
        .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      }
    } ,[axiosSecure, totalPrice])


    const handdleSubmit = async(event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        })

        if(error){
            console.log('payment error' , error);
            setError(error.message);
        }
        else{
            console.log('payment method', paymentMethod)
            setError('')
        }


        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret , {
          payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
          }
        })
        if(confirmError){
          console.log('Confirm error', error)
        }
        else{
          console.log('Payment Intent',paymentIntent)
          if(paymentIntent.status === "succeeded"){
            console.log('Transaction id : ' , paymentIntent.id);
            console.log(' Amount : ' , paymentIntent.amount);
            setTransactionId(paymentIntent.id);

            const payment = {
              email: user.email,
              price: totalPrice,
              transactionId: paymentIntent.id,
              date: new Date(),
              cartIds: cart.map(item => item._id),
              menuItemIds: cart.map(item => item.menuId),
              status: 'Pending'
            }
            const res = await axiosSecure.post('/payments', payment);
            console.log('Payment saved ',res.data)
            refetch();
            if(res.data.paymentResult.insertedId){
              Swal.fire({
                title: "Thank you for Payment",
                icon: "success",
                draggable: true,
                timer: 2000,
              });
              navigate('/dashboard/paymentHistory')
            }
          }
        }
        // console.log(transactionId)
    }



    return (
        <form className="border-2 p-5" onSubmit={handdleSubmit}>
             <CardElement className="shadow-lg p-4 "
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button className="btn btn-lg btn-primary my-4" type="submit" disabled={!stripe || !clientSecret }>
              Pay
            </button>
            <p className="text-red-500">{error}</p>
            {
              transactionId && <p className="text-green-500">Your Transaction Id : {transactionId}</p>
            }
        </form>
    );
};

export default CheakoutFrom;