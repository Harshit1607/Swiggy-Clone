import React, { useEffect } from 'react'
import styles from './CartPayment.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, verifyPayment } from '../../../Redux/paymentActions';
import img from '../../../assets/swiggy-1.svg'
const CartPayment = () => {
  const {deliveryAddress, user} = useSelector(state=>state.userReducer);
  const {order, loading, error, userOrder, makePayment} = useSelector(state=>state.paymentReducer);
  const {toPay} = useSelector(state=>state.cartReducer);
  const dispatch = useDispatch();

  const key = 'rzp_test_FuNvMN2XBQ048R'

  useEffect(()=>{
    if(order && makePayment){
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Swiggy",
        description: "Swiggy order",
        image: {img},
        order_id: order.id,
        handler: function (response) {
          // Response will contain signature and payment details
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          };
          const orderId = userOrder? userOrder._id : null
          dispatch(verifyPayment(orderId, paymentDetails));
        },
        prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
    }
  }, [order, makePayment])

  const handleOrder = ()=>{
    const userId = user? user._id : null;
    if(deliveryAddress){
      dispatch(createOrder(toPay, userId, deliveryAddress));
    }
    
  }

  if (loading) {
    return <div className='loading'>Loading...<div className='loader' /></div>;
  }

  if (error) {
    return <div className='loading'>Error: {error}</div>;
  }

  return (
   deliveryAddress ?
   <div className={styles.CartPayment}>
    <button onClick={()=>{handleOrder()}}>PROCEED TO PAY</button>
   </div>
   :
   <div> Payment </div>
  )
}

export default CartPayment