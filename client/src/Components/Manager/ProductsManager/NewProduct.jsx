import React, { useEffect, useState } from "react";
import style from "./NewProduct.module.css";
import { Input, Button, message } from "antd";

export default function NewProduct() {
  const [categories, setCategories] = useState();
  const [sections, setSections] = useState();
  const [products, setProducts] = useState();
  const [showProducts, setShowProducts] = useState(false);
  const [input, setInput] = useState({
    menuSectionId: "",
    categoryId: "",
    name: "",
    priceUSD: null,
  });
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await fetch("/products_categories_sections", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setSections(result.sections);
      setCategories(result.categories);
      setProducts(result.products);
    })();
  }, [submitClicked]);

  const handleShowProducts = async () => {
    setShowProducts(!showProducts);
  };

  const handleChange = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    const response = await fetch("/sections_categories_filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { ...input, [e.target.name]: e.target.value },
      }),
      credentials: "include",
    });
    const result = await response.json();
    setProducts(result.products);
    setCategories(result.categories);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setSubmitClicked(true);
    const key = "updatable";
    const hasValue = products.some((product) =>
      Object.values(product).includes(input.name)
    );
    if (hasValue) {
      message.error({
        content: "Product already exists",
        key,
        duration: 2,
      });
      setInput({
        menuSectionId: "",
        categoryId: "",
        name: "",
        priceUSD: null,
      });
    } else if (
      input.name === "" ||
      input.priceUSD === "" ||
      input.menuSectionId === "" ||
      input.categoryId === ""
    ) {
      message.error({
        content: "Fields cannot be empty",
        key,
        duration: 2,
      });
      setInput({
        menuSectionId: "",
        categoryId: "",
        name: "",
        priceUSD: null,
      });
    } else {
      const response = await fetch("/new_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
        credentials: "include",
      });
      const result = await response.json();

      if (result) {
        message.loading({
          content: "Adding new product...",
          key,
        });
        setTimeout(() => {
          message.success({
            content: "New product has been added",
            key,
            duration: 2,
          });
        }, 1000);
        setInput({
          menuSectionId: "",
          categoryId: "",
          name: "",
          priceUSD: null,
        });
      }
    }
    setSubmitClicked(false);
  };

  return (
    <div className={style.main_div}>
      <div className={style.main}>
        <div className={style.existing_products}>
          <div className={style.text}>
            Existing products:{" "}
            <button
              className={style.button_hide_show}
              onClick={handleShowProducts}
            >
              {showProducts ? "Hide" : "Show"}
            </button>
          </div>
          {showProducts ? (
            <div className={style.products}>
              {products?.map((category) => (
                <span className={style.product}>{category.name}</span>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style.form}>
        <div className={style.filter_div}>
          <span className={style.choose_section}>Choose a section</span>
          <select
            onChange={handleChange}
            className={style.select}
            name="menuSectionId"
            value={input.menuSectionId}
          >
            <option className={style.option} name="menuSectionId"></option>
            {sections?.map((el) => (
              <option className={style.option} key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filter_div}>
          <span className={style.choose_category}>Choose a category</span>
          <select
            onChange={handleChange}
            className={style.select}
            name="categoryId"
            value={input.categoryId}
          >
            <option className={style.option} name="categoryId"></option>
            {categories?.map((el) => (
              <option className={style.option} key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          onChange={handleInput}
          name="name"
          placeholder="name of the new product"
          value={input.name}
          className={style.input}
        />
        <Input
          onChange={handleInput}
          name="priceUSD"
          placeholder="price of the new product"
          value={input.priceUSD}
          className={style.input}
        />
        <Button
          onClick={handleSubmit}
          className={style.button}
          htmlType="submit"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
