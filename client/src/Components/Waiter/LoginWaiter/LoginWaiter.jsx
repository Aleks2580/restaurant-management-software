import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import style from "./LoginWaiter.module.css";
import { useState, useEffect } from "react";
import { digits } from "./mockdata";
import { RollbackOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function Waiter() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);

  const inputHandler = (e) => {
    setPassword((prev) => prev + e.target.innerText);
  };

  useEffect(() => {
    if (password.length === 6) {
      (async function () {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
          credentials: "include",
        });
        const result = await response.json();

        if (result === "Password is incorrect") {
          setPassword("");
          setCheckPassword(true);
          setTimeout(() => {
            setCheckPassword(false);
          }, 2000);
        } else {
          navigate("/waiter/main");
        }
      })();
    }
  }, [password]);

  const resetHandler = () => {
    setPassword("");
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
            value={password
              .split("")
              .map((el) => (el = "*"))
              .join("")}
          />
        </div>

        {checkPassword ? (
          <div className={style.incorrect}>
            <CloseCircleOutlined />
            Incorrect password
          </div>
        ) : (
          ""
        )}

        <Form.Item>
          <div className={style.form_buttons}>
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
