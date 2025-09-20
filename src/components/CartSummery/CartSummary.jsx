import { AppContext } from '../../context/AppContext';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';
import './CartSummary.css';

import React, { useContext } from 'react'

const CartSummary = ({customerName, mobileNumber, setMobileNumber, setCustomerName}) => {

  const {cartItems} = useContext(AppContext);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const tax = totalAmount * 0.01;

  const grandTotal = totalAmount + tax ;
  
  return (
    <div className='mt-2'>
       <div className='cart-summary-details'>
        <div className='d-flex justify-content-between mb-2'>
           <span className='text-light'>Item: </span>
           <span className='text-light'>LKR{totalAmount.toFixed(2)}</span>
        </div>
        <div className='d-flex justify-content-between mb-2'>
          <span className='text-light'>Tax (1%):</span>
          <span className='text-light'>LKR{tax.toFixed(2)}</span>
        </div>
        <div className='d-flex justify-content-between mb-4'>
           <span className='text-light'>Total:</span>
           <span className='text-light'>LKR{grandTotal.toFixed(2)}</span>
        </div>
       </div>
      <div className='d-flex gap-3'>
        <button className="btn btn-success flex-grow-1">
          Cash
        </button>
        <button className='btn btn-primary flex-grow-1'>
          UPI
        </button>
      </div> 
      <ReceiptPopup />
    </div>
  )
}

export default CartSummary
