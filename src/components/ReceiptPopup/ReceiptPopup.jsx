import './ReceiptPopup.css';
import React from 'react';

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
  if (!orderDetails) return null;

  // ✅ fallback array (cover orderItems too)
  const items =
    orderDetails.items ||
    orderDetails.cartItems ||
    orderDetails.orderItems ||
    [];

  // Normalize payment method
  const paymentMethod = orderDetails.paymentMethod?.toUpperCase();

  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success fs-1"></i>
        </div>
        <h3 className="text-center mb-4">Order Receipt</h3>

        <p>
          <strong>Order ID:</strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails.phoneNumber}
        </p>

        <hr className="my-3" />
        <h5 className="mb-3">Items Ordered</h5>
        <div className="cart-items-scrollable">
          {items.map((item, index) => (
            <div key={index} className="d-flex justify-content-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                LKR{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-3" />
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Subtotal:</strong>
          </span>
          <span>
            LKR{orderDetails.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Tax (1%):</strong>
          </span>
          <span>
            LKR{orderDetails.tax.toFixed(2)}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Grand Total:</strong>
          </span>
          <span>
            LKR{orderDetails.grandTotal.toFixed(2)}
          </span>
        </div>

        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>

        {paymentMethod === 'UPI' && orderDetails.paymentDetails && (
          <>
            <p>
              <strong>Razorpay Order ID:</strong>{' '}
              {orderDetails.paymentDetails.razorpayOrderId}
            </p>
            <p>
              <strong>Razorpay Payment ID:</strong>{' '}
              {orderDetails.paymentDetails.razorpayPaymentId}
            </p>
          </>
        )}

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className="btn btn-warning" onClick={onPrint}>
            Print Receipt
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopup;