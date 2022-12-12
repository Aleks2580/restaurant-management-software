import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import style from "./LoginManager.module.css";
import { useState, useEffect } from "react";
import { digits, managers } from "./mockdata";
import { RollbackOutlined } from "@ant-design/icons";

export default function Waiter() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);

  useEffect(() => {
    if (input.length === 6 && managers.password === input) {
      navigate("/manager/main");
    } else if (input.length === 6 && managers.password !== input) {
      setInput("");
      //navigate("/wrong_password");
      setCheckPassword(true);
      setTimeout(() => {
        setCheckPassword(false);
      }, 2000);
    }
  }, [input]);

  const inputHandler = (e) => {
    setInput((prev) => prev + e.target.innerText);
  };

  const resetHandler = () => {
    setInput("");
  };

  const submitHandler = () => {
    if (managers.password === input) {
      navigate("/manager/main");
    } else {
      setInput("");
      navigate("/wrong_password");
    }
  };

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <div className={style.manager}>
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
              className={style.button_manager}
              type="primary"
              shape="circle"
            >
              {el}
            </Button>
          ))}
        </div>
        <div>
          <input
            className={style.input_manager}
            value={input
              .split("")
              .map((el) => (el = "*"))
              .join("")}
          />
        </div>

        {checkPassword ? (
          <div className={style.incorrect}>Incorrect password</div>
        ) : (
          ""
        )}

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
