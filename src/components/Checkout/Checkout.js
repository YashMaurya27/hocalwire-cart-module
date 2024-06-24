import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { Table } from "antd";
import {
  deleteProduct,
  incrementByAmount,
  updateQuantity,
} from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { Delete, Trash } from "react-feather";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const quantityHandler = (quant, details) => {
    // console.log('handler', quant)
    const title = details?.["name"];
    const currentQuant = cart[title];
    // const newQuant = prevQuant + quant;
    if (currentQuant > 0) {
      dispatch(
        incrementByAmount({
          title: title,
          quantity: quant,
        })
      );
    }
  };
  // const deleteHandler = (details) => {
  //   console.log("delete", details);
  // };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <div className="grid-image">
        <img src={text} alt={"Cart-product"} />
      </div>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="grid-product-title">{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quant, details) => (
        <div className="quantity-container">
          <button onClick={() => quantityHandler(-1, details)}>-</button>
          <input
            type="text"
            onChange={(e) => {
              const regex = /^\d*$/;
              const val = e.target.value;
              const title = details["name"];
              if (regex.test(val) && Number(val) < 100) {
                dispatch(
                  updateQuantity({
                    title: title,
                    quantity: Number(val),
                  })
                );
              }
            }}
            value={cart?.[details["name"]]}
          />
          <button onClick={() => quantityHandler(1, details)}>+</button>
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      // render: (details) => (
      //     <button onClick={() => deleteHandler(details)}><Delete /></button>
      // ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const [products, setProducts] = useState();
  const [cartLoad, setCartLoad] = useState();
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  const arrangeCartData = (productsData) => {
    const cartProducts = Object.values(productsData).map(
      (eachProduct, index) => {
        return {
          key: index,
          image: eachProduct['image'],
          name: eachProduct["title"],
          category: eachProduct["category"],
          price: eachProduct["price"],
          quantity: cart[eachProduct["title"]],
          total: cart[eachProduct["title"]] * Number(eachProduct["price"]).toFixed(2),
          delete: (
            <button
              onClick={() => {
                dispatch(
                  deleteProduct({
                    title: eachProduct["title"],
                  })
                );
                const prod = { ...products };
                delete prod?.[eachProduct["title"]];
                setProducts({ ...prod });
              }}
              className="delete-btn"
            >
              <Trash />
            </button>
          ),
        };
      }
    );
    setCartData([...cartProducts]);
    setCartLoad(false);
  };

  async function fetchProducts() {
    setCartLoad(true);
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      res = await res.json();
      const productNames = Object.keys(cart);
      const productsData = {};
      res.forEach((product) => {
        if (productNames.includes(product?.["title"])) {
          const title = product["title"];
          // products[title] = {
          //   ...product,
          //   ["quantity"]: cart[title],
          // };
          productsData[title] = { ...product };
        }
      });
      setProducts({ ...productsData });
      // console.log("cartData", productsData);
      // arrangeCartData(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      arrangeCartData(products);
    }
  }, [products, cart]);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      let totalPrice = 0;
      cartData.forEach((product) => {
        totalPrice += product["total"];
      });
      setTotal(totalPrice);
    }
  }, [cartData]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Navbar />
      {cartLoad === false ? (
        <div className="grid-container">
          <h1>Here's your cart</h1>
          <Table columns={columns} dataSource={cartData} />
          <div className="total-div">
            <p>Total: {total}</p>
          </div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}
