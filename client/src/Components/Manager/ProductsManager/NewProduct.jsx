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

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
  };
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
            //onChange={handleChange}
            className={style.select}
            name="menuSectionId"
          >
            {sections?.map((el) => (
              <option
                className={style.option}
                key={el.id}
                value={el.id}
                //name="section"
              >
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filter_div}>
          <span className={style.choose_category}>Choose a category</span>
          <select
            //onChange={handleChange}
            className={style.select}
            name="categoryId"
          >
            {categories?.map((el) => (
              <option
                className={style.option}
                key={el.id}
                value={el.id}
                //name="section"
              >
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          //onChange={handleChange}
          name="name"
          placeholder="name of the new product"
          value={input.name}
          className={style.input}
        />
        <Input
          //onChange={handleChange}
          name="price"
          placeholder="price of the new product"
          value={input.priceUSD}
          className={style.input}
        />
        <Button
          //onClick={handleSubmit}
          className={style.button}
          htmlType="submit"
        >
          Submit
        </Button>
      </div>
    </>
  );
  //<div>NewProduct</div>;
}
