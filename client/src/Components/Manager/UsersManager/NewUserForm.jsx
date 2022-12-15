import React from "react";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import style from "./NewUserForm.module.css";

export default function NewUserForm() {
  const [input, setInput] = useState({ fullName: "", password: "", role: "" });

  function inputHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    const response = await fetch("http://localhost:4000/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      credentials: "include",
    });
    const result = await response.json();
  }

  console.log(input);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input name!",
          },
        ]}
      >
        <Input onChange={inputHandler} name="fullName" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input password!",
          },
        ]}
      >
        <Input.Password
          onChange={inputHandler}
          name="password"
          placeholder="6 digits"
        />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: "Please input role!",
          },
        ]}
      >
        <Input
          onChange={inputHandler}
          name="role"
          placeholder="manager or waiter"
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          onClick={submitHandler}
          className={style.button}
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
