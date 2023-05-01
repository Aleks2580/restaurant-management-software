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
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1000);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/products?page=${page}&pageSize=${pageSize}&section=${filter.section}&category=${filter.category}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      setProducts(result.products);
      setLoading(false);
      setTotal(result.totalCount);
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
    handleChange();
  };

  const handleChange = async (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });

    const response = await fetch(
      `http://localhost:4000/products?page=${page}&pageSize=${pageSize}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { ...filter, [e.target.name]: e.target.value },
        }),
        credentials: "include",
      }
    );
    const result = await response.json();
    setProducts(result.products);
    setCategories(result.categories);
    setTotal(result.totalCount);
  };

  const handleResetFilters = () => {
    setFilter({ section: "all", category: "all" });
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
            value={filter.section}
          >
            <option className={style.option} value="all" name="section">
              all
            </option>
            {sections?.map((el) => (
              <option
                className={style.option}
                value={el.name}
                name="section"
                key={el.id}
              >
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
            value={filter.category}
          >
            <option className={style.option} value="all" name="category">
              all
            </option>
            {categories?.map((el) => (
              <option
                className={style.option}
                value={el.name}
                name="category"
                key={el.id}
              >
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <button className={style.reset_button} onClick={handleResetFilters}>
          reset filters
        </button>
      </div>
      <div className={style.products}>
        {products?.map((el) => (
          <OneProduct el={el} key={el.id} />
        ))}
      </div>
      <div className={style.pagination}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={total}
          onChange={handlePageChange}
        />
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
}
