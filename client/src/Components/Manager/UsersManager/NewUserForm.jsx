import React from "react";
import { useState } from "react";
import { Button, Input, message } from "antd";
import style from "./NewUserForm.module.css";

export default function NewUserForm() {
  const [input, setInput] = useState({ fullName: "", password: "", role: "" });

  function inputHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function submitHandler() {
    if (input.fullName && input.password && input.role) {
      const key = "updatable";
      const response = await fetch("http://localhost:4000/add_user", {
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
          content: "Creating new user...",
          key,
        });
        setTimeout(() => {
          message.success({
            content: "New user has been created",
            key,
            duration: 2,
          });
        }, 1000);
        setInput({ fullName: "", password: "", role: "" });
      }
    } else {
      message.warning({
        content: "Fill out all fields",
      });
    }
  }

  return (
    <div className={style.form}>
      <Input
        onChange={inputHandler}
        name="fullName"
        placeholder="full name"
        value={input.fullName}
        className={style.input}
      />

      <Input.Password
        onChange={inputHandler}
        name="password"
        placeholder="6 digit password"
        value={input.password}
        className={style.input}
      />

      <Input
        onChange={inputHandler}
        name="role"
        value={input.role}
        placeholder="role: manager or waiter"
        className={style.input}
      />

      <Button
        onClick={submitHandler}
        className={style.button}
        htmlType="submit"
      >
        Submit
      </Button>
    </div>
  );
}
