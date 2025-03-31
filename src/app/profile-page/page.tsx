import React from "react";
import "./ProfilePage.css";
import { person } from "@/assets";
import Image from "next/image";
import { ProfileSaveChange } from "@/components";

type Order = {
  id: number;
  status: "Delivered" | "Canceled" | "On the way";
  description: string;
  image: string;
};

const orders: Order[] = [
  {
    id: 123,
    status: "Delivered",
    description: "Lorem ipsum dolor sit amet, adipiscing elit, sed do.",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  },
  {
    id: 124,
    status: "Canceled",
    description: "Lorem ipsum dolor sit amet, adipiscing elit, sed do.",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  },
  {
    id: 125,
    status: "On the way",
    description: "Lorem ipsum dolor sit amet, adipiscing elit, sed do.",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  }
];

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-container section__padding">
      <div className="profile-sidebar">
        <Image
          src={person}
          alt="User Profile"
          className="profile-picture"
        />
        <h2>Mrs. Jane Doe</h2>
        <form className="profile-form">
          <div className="form-row">
            <label>Full Name</label>
            <input type="text" value="John Doe" readOnly />
          </div>

          <div className="form-row">
            <label>E-mail</label>
            <input type="email" value="John.Doe@gmail.com" readOnly />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input type="text" value="+94 22 22***" readOnly />
          </div>

          <div className="form-row">
            <label>Address</label>
            <input type="text" value="Address 1" readOnly />
          </div>

          <ProfileSaveChange title="Save Changes" />
        </form>
      </div>
      <div className="order-history">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <div className="order-details">
              <img
                src={order.image}
                alt="Order Item"
                className="order-item-image"
              />
              <div>
                <span
                  className={`order-status ${order.status
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {order.status}
                </span>
                <p className="order-summary-description">{order.description}</p>
                <div className="order-actions">
                  <button>Buy again</button>
                  <button>View Item</button>
                  <button>Review</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
