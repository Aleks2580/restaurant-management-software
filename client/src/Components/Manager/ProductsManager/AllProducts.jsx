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
  const [filter, setFilter] = useState({ section: "all", category: "all" });
  const [resetClicked, setResetClicked] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/products?page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
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
      setCategories(result.categories);
      setSections(result.sections);
      setResetClicked(false);
    })();
  }, [resetClicked, page, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleChange = async (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { ...filter, [e.target.name]: e.target.value },
      }),
      credentials: "include",
    });
    const result = await response.json();
    setProducts(result.products);
    setCategories(result.categories);
  };

  console.log(filter);

  const handleResetFilters = () => {
    setCategories([]);
    setSections([]);
    setResetClicked(true);
  };

  return !loading ? (
    <div className={style.all_products}>
      <div className={style.filters}>
        <div className={style.filter_div}>
          Section
          <select
            onChange={handleChange}
            className={style.select}
            name="section"
          >
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
          <select
            onChange={handleChange}
            className={style.select}
            name="category"
          >
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
        <button onClick={handleResetFilters}>reset filters</button>
      </div>
      <div className={style.products}>
        {products?.map((el) => (
          <OneProduct el={el} key={el.id} />
        ))}
      </div>
      <div className={style.pagination}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={10}
          total={50}
          onChange={handlePageChange}
        />
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
}
