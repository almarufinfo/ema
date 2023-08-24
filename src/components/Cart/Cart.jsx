import React from 'react';
import './Cart.css';


const Cart = ({ cart }) => {

    /*
option-1: const Cart = ({cart}) => {

   option-2: const Cart = (props) => {

    option-3: const cart = props.Cart;
    
    both are same

    option-4: const cart = props.Cart;
 or
    const { cart } =  props ;  it's destructuring
    */

    console.log(cart)

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {

        // if (product.quantity === 0) {
        //     product.quantity = 1;
        // }
        // or
        // product.quantity = product.quantity || 1;


        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice * 5 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price:${totalPrice} </p>
            <p>Total Shopping Charge:${totalShipping} </p>
            <p>Tax:${tax.toFixed(2)} </p>
            <h5>Grand Total:${grandTotal.toFixed(2)}</h5>
        </div>
    );
};

export default Cart; 