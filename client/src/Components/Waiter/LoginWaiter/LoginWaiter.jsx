import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import style from "./LoginWaiter.module.css";
import { useState } from "react";
import { digits, waiters } from "./mockdata";
import { RollbackOutlined } from "@ant-design/icons";
export default function Waiter() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput((prev) => prev + e.target.innerText);
  };

  const resetHandler = () => {
    setInput("");
  };

  const submitHandler = () => {
    if (waiters.password === input) {
      navigate("/waiter/main");
    } else {
      setInput("");
      navigate("/wrong_password");
    }
  };

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <div className={style.waiter}>
      <RollbackOutlined onClick={goBackHandler} className={style.icon_back} />
      <Form
        className={style.form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <span className={style.span}>Enter your 6 digit password</span>
        <div className={style.digits}>
          {digits.map((el) => (
            <Button
              onClick={inputHandler}
              className={style.button_waiter}
              type="primary"
              shape="circle"
            >
              {el}
            </Button>
          ))}
        </div>
        <div>
          <input
            className={style.input_waiter}
            value={input
              .split("")
              .map((el) => (el = "*"))
              .join("")}
          />
        </div>

        <Form.Item>
          <div className={style.form_buttons}>
            <Button
              onClick={submitHandler}
              className={style.button}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              onClick={resetHandler}
              className={style.button_reset}
              type="primary"
            >
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
