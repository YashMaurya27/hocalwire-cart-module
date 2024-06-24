import React, { useState } from "react";
import "./Arrivals.css";
import { Star } from "react-feather";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../../redux/cartSlice";
import { Button, Spin, Tooltip, message } from "antd";

export default function Arrivals(props) {
  const [isHovered, setIsHovered] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleHover = (index) => {
    setIsHovered(index);
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

  return (
    <div className="arrivals-container">
      {contextHolder}
      <h3>Trending Now</h3>
      {props.productLoad === false && props.products ? (
        <div className="arrivals-items">
          {props.products?.map((product, index) => {
            return (
              <div
                className="arrivals-item"
                key={"arrival-item" + index}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(index)}
              >
                <p className="arrivals-tag">Sale</p>
                <img
                  // src={isHovered === index ? altImgArray[index] : image}
                  src={product?.["image"]}
                  alt="arrival-item"
                  style={{
                    transition: "opacity 0.3s ease",
                    display: isHovered === index ? 0.8 : 1,
                  }}
                  onClick={() => nav("../product/" + product["id"])}
                />
                <Button
                  type="link"
                  onClick={() => nav("../product/" + product["id"])}
                  className="arrivals-title"
                >
                  <Tooltip title={product?.["title"] || "N/A"}>
                    <span>
                      {product?.["title"].split(" ").splice(0, 7).join(" ")}
                    </span>
                  </Tooltip>
                  {/* {product?.["title"] || "N/A"} */}
                </Button>
                <div className="arrivals-details">
                  <p>Rs. {product?.["price"] || "N/A"}</p>
                  <div className="arrivals-rating">
                    <p>
                      {Array(5)
                        .fill(1)
                        .map((star, index) => {
                          const color =
                            index + 1 <= Number(product?.["rating"]?.["rate"])
                              ? "#fbb03b"
                              : "#959699";
                          return <Star color={color} fill={color} size={14} />;
                        })}
                    </p>
                    <p>
                      {product?.["rating"]?.["rate"]} {`(`}
                      {product?.["rating"]?.["count"]}
                      {`)`}
                    </p>
                  </div>
                </div>

                <button
                  className="arrivals-view-btn"
                  style={{
                    transition: "opacity 0.5s ease",
                    opacity:
                      window.innerWidth <= 576
                        ? 1
                        : isHovered === index
                        ? 1
                        : 0,
                  }}
                  onClick={() => {
                    dispatch(
                      incrementByAmount({
                        title: product?.["title"],
                        quantity: 1,
                      })
                    );
                    renderMessage("success", "Added to cart successfully!");
                  }}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="loading-container">
          <Spin />
          <p className="loading-text">Please wait..</p>
        </div>
      )}
    </div>
  );
}
