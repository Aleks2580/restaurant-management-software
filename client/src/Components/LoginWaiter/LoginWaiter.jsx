import React from "react";
import { Button, Form, Input } from "antd";
import style from "./LoginWaiter.module.css";

export default function Waiter() {
  return (
    <div className={style.waiter}>
      <span>Enter your password</span>
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

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
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
