import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Home.css";
import Banners from "./Banners";
import Arrivals from "./Arrivals";
import Footer from "./Footer";
import { message } from "antd";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [productLoad, setProductLoad] = useState();

  async function fetchProducts() {
    setProductLoad(true);
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      res = await res.json();
      setProducts([...res]);
      setProductLoad(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductLoad(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Navbar />
      <div className="home-container">
        <Banners />
        <Arrivals products={products} productLoad={productLoad} />
        <Footer />
      </div>
    </div>
  );
}
