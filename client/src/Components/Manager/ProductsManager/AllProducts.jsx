import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";

export default function AllProducts() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/products", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setProducts(result.products);
      setLoading(false);
    })();
  }, []);
  return <div>AllProducts</div>;
}
