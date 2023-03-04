import React, { useEffect, useState } from "react";
import style from "./NewCategory.module.css";
import { Input, Button, message } from "antd";

export default function NewCategory() {
  const [categories, setCategories] = useState();
  const [sections, setSections] = useState();
  const [input, setInput] = useState({ menuSectionId: "", name: "" });
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
  }, [submitClicked]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitClicked(true);
    const key = "updatable";
    const hasValue = categories.some((category) =>
      Object.values(category).includes(input.name)
    );
    if (hasValue) {
      message.error({
        content: "Section already exists!",
        key,
        duration: 2,
      });
    } else {
      const response = await fetch("http://localhost:4000/new_category", {
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
          content: "Creating new menu category...",
          key,
        });
        setTimeout(() => {
          message.success({
            content: "New category has been created",
            key,
            duration: 2,
          });
        }, 1000);
        setInput({ menuSectionId: "", name: "" });
      }
    }
    setSubmitClicked(false);
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
            onChange={handleChange}
            className={style.select}
            name="menuSectionId"
          >
            {sections?.map((el) => (
              <option
                className={style.option}
                key={el.id}
                value={el.id}
                name="section"
              >
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          onChange={handleChange}
          name="name"
          placeholder="name of the new category"
          value={input.name}
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
