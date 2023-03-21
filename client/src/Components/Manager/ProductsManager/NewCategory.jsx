import React, { useEffect, useState } from "react";
import style from "./NewCategory.module.css";
import { Input, Button, message } from "antd";

export default function NewCategory() {
  const [categories, setCategories] = useState();
  const [sections, setSections] = useState();
  const [input, setInput] = useState({ menuSectionId: "1", name: "" });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

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
    //setOptionChosen(false);
  }, [submitClicked, selectedOption]);

  const handleChange = async (e) => {
    console.log(typeof e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
    const response = await fetch("http://localhost:4000/categories_filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuSectionId: +e.target.value,
      }),
      credentials: "include",
    });
    const result = await response.json();
    setCategories(result.categories);
    //setUsers(result.roles);
    // setCategories((prevCategories) => {
    //   return prevCategories.filter(
    //     (category) => category.menuSectionId === +e.target.value
    //   );
    // });
    //setSelectedOption(e.target.value);
    //setSelectedOption(event.target.value);
    //setOptionChosen(true);
    //console.log(typeof categories[0].menuSectionId);
  };

  const handleSubmit = async () => {
    setSubmitClicked(true);
    const key = "updatable";
    const hasValue = categories.some((category) =>
      Object.values(category).includes(input.name)
    );
    if (hasValue) {
      message.error({
        content: "Category already exists",
        key,
        duration: 2,
      });
      setInput({ menuSectionId: "1", name: "" });
    } else if (input.name === "") {
      message.error({
        content: "Input can't be empty",
        key,
        duration: 2,
      });
      setInput({ menuSectionId: "1", name: "" });
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
        setInput({ menuSectionId: "1", name: "" });
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
            <option
              className={style.option}
              //key={el.id}
              //value={el.id}
              name="section"
            ></option>
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
