import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
import { ShoppingCart } from "react-feather";
import { Badge } from "antd";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const navOptions = {
    left: ["Home", "Categories", "Contact", "About Us"],
    right: [
      <Badge count={Object.keys(cart).length}>
        <ShoppingCart />
      </Badge>,
    ],
  };
  const nav = useNavigate();
  return (
    <div className="navbar-container">
      <div className="nav-left">
        <img
          src="https://media.licdn.com/dms/image/C4E0BAQFeaZI1xpsLiw/company-logo_200_200/0/1631347912177?e=2147483647&v=beta&t=XSp2NWp-8uR1d9uPO4KAiRkVAwmO61ehrNzZfhQVqOo"
          alt="villagius-logo"
          className="site-logo"
        />
        {navOptions["left"].map((option) => {
          return (
            <button
              onClick={() => {
                if (option === "Home") {
                  nav("../home");
                }
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="nav-right">
        {navOptions["right"].map((option) => {
          return (
            <button
              onClick={() => {
                nav("../checkout");
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
