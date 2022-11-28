import React from "react";
import { Button, Form, Input } from "antd";
import style from "./LoginWaiter.module.css";
import { useState } from "react";

export default function Waiter() {
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput((prev) => prev + e.target.innerText);
  };

  return (
    <div className={style.waiter}>
      <span>Enter your password</span>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div className={style.digits}>
          <Button className={style.button_waiter} type="primary" shape="circle">
            1
          </Button>
          <Button className={style.button_waiter} type="primary" shape="circle">
            2
          </Button>
          <Button className={style.button_waiter} type="primary" shape="circle">
            3
          </Button>

          <Button className={style.button_waiter} type="primary" shape="circle">
            4
          </Button>
          <Button className={style.button_waiter} type="primary" shape="circle">
            5
          </Button>
          <Button className={style.button_waiter} type="primary" shape="circle">
            6
          </Button>

          <Button className={style.button_waiter} type="primary" shape="circle">
            7
          </Button>
          <Button className={style.button_waiter} type="primary" shape="circle">
            8
          </Button>
          <Button className={style.button_waiter} type="primary" shape="circle">
            9
          </Button>

          <Button className={style.zero} type="primary" shape="circle">
            0
          </Button>
        </div>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Input your password!" }]}
        >
          <Input.Password className={style.input_waiter} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
