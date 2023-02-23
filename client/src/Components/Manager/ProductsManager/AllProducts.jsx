import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";
import { Spin } from "antd";
import style from "./AllProducts.module.css";
import { Pagination } from "antd";

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
      console.log(result);
      setProducts(result.products);
      setLoading(false);
    })();
  }, []);
  return !loading ? (
    <div className={style.all_products}>
      <div className={style.products}>
        {products?.map((el) => (
          <OneProduct el={el} key={el.id} />
        ))}
      </div>
      <div className={style.pagination}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
}
