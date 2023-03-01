import React, { useEffect, useState } from "react";
import style from "./NewCategory.module.css";
import { Input, Button, message } from "antd";

export default function NewCategory() {
  const [categories, setCategories] = useState();
  const [sections, setSections] = useState();
  const [input, setInput] = useState({ section: "", name: "" });
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/menu_categories", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setCategories(result.categories);
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
      setSections(result.sections);
    })();
  }, []);

  const handleInput = () => {
    setInput();
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.existing_categories}>
          <div className={style.text}>Existing categories:</div>
          <div className={style.categories}>
            {categories?.map((category) => (
              <span className={style.category}>{category.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={style.form}>
        <div className={style.filter_div}>
          Choose a section
          <select
            //onChange={handleChange}
            className={style.select}
            name="section"
          >
            {sections?.map((el) => (
              <option className={style.option} value={el.name} name="section">
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          //onChange={handleInput}
          name="name"
          placeholder="name of the new category"
          value={input.name}
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
}
