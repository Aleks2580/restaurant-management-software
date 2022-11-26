import React from "react";
import { Button, Form, Input } from "antd";
import style from "./LoginServer.module.css";

export default function LoginWaiter() {
  return (
    <div className={style.server}>
      <div className={style.digits}>
        <Button type="primary" shape="circle">
          1
        </Button>
        <Button type="primary" shape="circle">
          2
        </Button>
        <Button type="primary" shape="circle">
          3
        </Button>

        <Button type="primary" shape="circle">
          4
        </Button>
        <Button type="primary" shape="circle">
          5
        </Button>
        <Button type="primary" shape="circle">
          6
        </Button>

        <Button type="primary" shape="circle">
          7
        </Button>
        <Button type="primary" shape="circle">
          8
        </Button>
        <Button type="primary" shape="circle">
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
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className={style.input_server} />
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
