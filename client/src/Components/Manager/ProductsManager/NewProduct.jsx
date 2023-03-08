import React, { useEffect, useState } from "react";
import style from "./NewProduct.module.css";
import { Input, Button, message } from "antd";

export default function NewProduct() {
  const [categories, setCategories] = useState();
  const [sections, setSections] = useState();
  const [products, setProducts] = useState();
  const [showProducts, setShowProducts] = useState(false);
  const [input, setInput] = useState({
    menuSectionId: "1",
    categoryId: "1",
    name: "",
    priceUSD: null,
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/products_categories_sections",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      setSections(result.sections);
      setCategories(result.categories);
      setProducts(result.products);
    })();
  }, [submitClicked]);

  const handleShowProducts = async () => {
    setShowProducts(!showProducts);
  };

  const handleChange = (e) => {
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
        menuSectionId: "1",
        categoryId: "1",
        name: "",
        priceUSD: null,
      });
    } else if (input.name === "" || input.priceUSD === "") {
      message.error({
        content: "Inputs cannot be empty",
        key,
        duration: 2,
      });
      setInput({
        menuSectionId: "1",
        categoryId: "1",
        name: "",
        priceUSD: null,
      });
    } else {
      const response = await fetch("http://localhost:4000/new_product", {
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
          menuSectionId: "1",
          categoryId: "1",
          name: "",
          priceUSD: null,
        });
      }
    }
    setSubmitClicked(false);
  };

  console.log(input);

  return (
    <>
      <div className={style.main}>
        <div className={style.existing_products}>
          <div className={style.text}>
            Existing products:{" "}
            <button onClick={handleShowProducts}>
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
          >
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
          >
            {categories?.map((el) => (
              <option className={style.option} key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          onChange={handleChange}
          name="name"
          placeholder="name of the new product"
          value={input.name}
          className={style.input}
        />
        <Input
          onChange={handleChange}
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
    </>
  );
}
