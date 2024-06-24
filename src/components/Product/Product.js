import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./product.css";
import Navbar from "../Home/Navbar";
import { Star } from "react-feather";
import { cod } from "../../assets/icons/cod";
import { delivery } from "../../assets/icons/delivery";
import { returnIcon } from "../../assets/icons/return";
import { quality } from "../../assets/icons/quality";
import { increment, decrement, incrementByAmount } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin, message } from "antd";

export default function Product() {
  const productID = useParams()?.id;
  const [productDetails, setProductDetails] = useState();
  const [quantity, setQuantity] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  // const count = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productID}`)
      .then((res) => res.json())
      .then((json) => {
        setProductDetails({ ...json });
      });
  }, []);

  const quantityHandler = (quant) => {
    const prevQuant = quantity;
    const newQuant = prevQuant + quant;
    if (newQuant > 0) {
      setQuantity(newQuant);
    }
  };

  const renderMessage = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const keyPoints = [
    {
      icon: cod,
      title: "Cash On Delivery",
      description: "COD available on all products",
    },
    {
      icon: returnIcon,
      title: "Easy Returns",
      description: "Hassle free returns within 7 days",
    },
    {
      icon: delivery,
      title: "Free Delivery",
      description: "Free delivery all across India",
    },
    {
      icon: quality,
      title: "Premium Quality",
      description: "Best possible craftsmanship on every product",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {contextHolder}
      <Navbar />
      <div className="product-page-container">
        {productDetails ? (
          <div className="product-details-container">
            <div>
              <img
                src={productDetails?.["image"] ?? ""}
                alt={productDetails?.["title"] || "N/A"}
              />
            </div>
            <div>
              <h2>{productDetails?.["title"] || "N/A"}</h2>
              <div className="rating-price">
                <h3>Rs. {productDetails?.["price"]}</h3>
                <div className="rating-container">
                  <p>
                    {Array(5)
                      .fill(1)
                      .map((star, index) => {
                        const color =
                          index + 1 <=
                          Number(productDetails?.["rating"]?.["rate"])
                            ? "#fbb03b"
                            : "#959699";
                        return <Star color={color} fill={color} size={14} />;
                      })}
                  </p>
                  <p>
                    {productDetails?.["rating"]?.["rate"]} {`(`}
                    {productDetails?.["rating"]?.["count"]}
                    {`)`}
                  </p>
                </div>
              </div>
              <div className="description-container">
                <p>{productDetails?.["description"] || "N/A"}</p>
              </div>
              <p>Quantity:</p>
              <div className="quantity-container">
                <button onClick={() => quantityHandler(-1)}>-</button>
                <input
                  type="text"
                  onChange={(e) => {
                    const regex = /^\d*$/;
                    const val = e.target.value;
                    if (regex.test(val) && Number(val) < 100) {
                      setQuantity(Number(val));
                    }
                  }}
                  value={quantity}
                />
                <button onClick={() => quantityHandler(1)}>+</button>
              </div>
              <button
                onClick={() => {
                  if (quantity >= 1) {
                    dispatch(
                      incrementByAmount({
                        title: productDetails?.["title"],
                        quantity: quantity,
                      })
                    );
                    renderMessage("success", "Added to cart successfully!");
                    setQuantity(1);
                  } else {
                    renderMessage("error", "Please select a valid quantity");
                  }
                }}
                className="product-cart-btn"
              >
                Add To Cart
              </button>
              <div className="key-points">
                {keyPoints.map((point) => {
                  return (
                    <div className="key-point">
                      {point?.["icon"]}
                      <h4>{point?.["title"]}</h4>
                      <p>{point?.["description"]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <Spin />
            <p className="loading-text">Please wait..</p>
          </div>
        )}
      </div>
    </div>
  );
}
