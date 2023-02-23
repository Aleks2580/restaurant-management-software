import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";
import { Spin } from "antd";
import style from "./AllProducts.module.css";
import { Pagination } from "antd";

export default function AllProducts() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/products", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      //console.log(result);
      setProducts(result.products);
      setLoading(false);
    })();
    (async function () {
      const response = await fetch(
        "http://localhost:4000/products_categories",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      setCategories(result.categories);
      // setLoading(false);
    })();
  }, []);

  const handleChange = () => {};

  return !loading ? (
    <div className={style.all_products}>
      <div className={style.filter_div}>
        <select onChange={handleChange} className={style.select}>
          <option className={style.option} value="all" name="all">
            all
          </option>
          {categories?.map((el) => (
            <option className={style.option} value={el} name={el}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
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
