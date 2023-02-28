import React, { useEffect, useState } from "react";
import style from "./NewSection.module.css";
import { Input, Button, message } from "antd";

export default function NewSection() {
  const [sections, setSections] = useState();
  const [input, setInput] = useState({ name: "" });
  const [submitClicked, setSubmitClicked] = useState(false);

  function handleInput(e) {
    setInput({ [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setSubmitClicked(true);
    const key = "updatable";
    const hasValue = sections.some((section) =>
      Object.values(section).includes(input.name)
    );
    if (hasValue) {
      message.error({
        content: "Section already exists!",
        key,
        duration: 2,
      });
    } else {
      const response = await fetch("http://localhost:4000/new_section", {
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
          content: "Creating new menu section...",
          key,
        });
        setTimeout(() => {
          message.success({
            content: "New section has been created",
            key,
            duration: 2,
          });
        }, 1000);
        setInput({ name: "" });
      }
    }
    setSubmitClicked(false);
  }
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/menu_sections", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setSections(result.sections);
    })();
  }, [submitClicked]);

  return (
    <>
      <div className={style.main}>
        <div className={style.existing_sections}>
          <div className={style.text}>Existing sections:</div>
          <div className={style.sections}>
            {sections?.map((section) => (
              <span className={style.section}>{section.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={style.form}>
        <Input
          onChange={handleInput}
          name="name"
          placeholder="name of the new section"
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
