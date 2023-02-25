import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";
import { Spin } from "antd";
import style from "./AllProducts.module.css";
import { Pagination } from "antd";

export default function AllProducts() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);

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
    (async function () {
      const response = await fetch(
        "http://localhost:4000/products_categories_sections",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result.sections);
      setCategories(result.categories);
      setSections(result.sections);
    })();
  }, []);

  const handleChange = async (e) => {
    //console.log(e.target.value);
    //setCategoryName(e.target.value);
    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.value,
      }),
      credentials: "include",
    });
    const result = await response.json();
    setProducts(result.products);
  };

  //console.log(categoryName);

  return !loading ? (
    <div className={style.all_products}>
      <div className={style.filters}>
        <div className={style.filter_div}>
          Section
          <select onChange={handleChange} className={style.select}>
            <option className={style.option} value="all" name="section">
              all
            </option>
            {sections?.map((el) => (
              <option className={style.option} value={el.name} name={el}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filter_div}>
          Category
          <select onChange={handleChange} className={style.select}>
            <option className={style.option} value="all" name="category">
              all
            </option>
            {categories?.map((el) => (
              <option className={style.option} value={el.name} name={el}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
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
