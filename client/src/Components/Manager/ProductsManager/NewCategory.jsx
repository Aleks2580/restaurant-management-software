import React, { useEffect, useState } from "react";
import style from "./NewSection.module.css";
import { Input, Button, message } from "antd";

export default function NewCategory() {
  const [categories, setCategories] = useState();
  const [sections, setSections] = useState();
  const [input, setInput] = useState({ name: "" });
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
  }, []);

  return (
    <>
      <div className={style.main}>
        <div className={style.existing_sections}>
          <div className={style.text}>Existing sections:</div>
          <div className={style.sections}>
            {categories?.map((category) => (
              <span className={style.section}>{category.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={style.form}>
        <Input
          //onChange={handleInput}
          name="name"
          placeholder="name of the new section"
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
