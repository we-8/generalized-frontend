import React from "react";
import "./checkout.css";

const Checkout: React.FC = () => {
  const summaryOrder = [
    {
      id: 1,
      item: "Lorem ipsum dolor sit amet",
      description: "Lorem, adipiscing necessitatem est blandit ex ea dolor",
      price: "$150.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      item: "Lorem ipsum dolor sit amet",
      description: "Lorem, adipiscing necessitatem est blandit ex ea dolor",
      price: "$150.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      item: "Lorem ipsum dolor sit amet",
      description: "Lorem, adipiscing necessitatem est blandit ex ea dolor",
      price: "$150.00",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="checkout-container">
      <div className="summary-order">
        <h2>Summary Order</h2>
        <p className="subtext">
          Check your item and select your shipping for a better experience order
          item
        </p>
        <div className="order-items">
          {summaryOrder.map((order) => (
            <div key={order.id} className="order-item">
              <img src={order.image} alt="Product" className="item-image" />
              <div className="item-details">
                <p className="item-title">{order.item}</p>
                <p className="item-description">{order.description}</p>
                <p className="item-price">{order.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="shipping-method">
          <h3 className="shipping-method-label">Available Shipping Method</h3>

          <label className="shipping-option">
            <img
              src="https://via.placeholder.com/40"
              alt="FedEx"
              className="shipping-image"
            />
            <div className="shipping-details">
              <span>FedEx Delivery</span>
              <p>Delivery 2-3 working days</p>
            </div>
            <input type="radio" name="shipping" className="shipping-radio" />
          </label>
          <label className="shipping-option">
            <img
              src="https://via.placeholder.com/40"
              alt="FedEx"
              className="shipping-image"
            />
            <div className="shipping-details">
              <span>FedEx Delivery</span>
              <p>Delivery 2-3 working days</p>
            </div>
            <input type="radio" name="shipping" className="shipping-radio" />
          </label>
        </div>
      </div>

      <div className="payment-details">
        <h2>Payment Details</h2>
        <p className="subtext">
          Complete your purchase by providing your payment details
        </p>
        <form>
          <label>Email Address</label>
          <input type="email" placeholder="John.Doe@gmail.com" />

          <label>Card Details</label>
          <div className="card-details">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVC" />
          </div>

          <label>Card Holder</label>
          <input type="text" placeholder="John Doe" />

          <label>Billing Address</label>
          <input
            type="text"
            placeholder="7831 Garfield Ave, Huntington Beach"
          />

          <div className="country">
            <input type="text" placeholder="Australia" />
            <input type="text" placeholder="92648" />
          </div>

          <div className="pickup-delivery">
            <label className="custom-radio">
              Pick Up
              <input type="radio" name="delivery" />
              <span className="checkmark"></span>
            </label>
            <label>
              Delivery
              <input type="radio" name="delivery" />
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="payment-summary">
            <p>
              Sub total: <span>$387.00</span>
            </p>
            <p>
              Vat (20%): <span>$2.89</span>
            </p>
            <p>
              Total: <span>$389.89</span>
            </p>
          </div>
          <button type="submit" className="pay-button">
            Pay $389.89
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
