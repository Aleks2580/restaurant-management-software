import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";
import style from "./EditUser.module.css";
import { doneEditing } from "../../../store/editUser/actionCreators";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fullname, password, role, id } = useSelector(
    (state) => state.editUser
  );

  const [input, setInput] = useState({
    fullName: fullname,
    Password: password,
    Role: role,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeHandler = async (e) => {
    const response = await fetch("/edit_user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: input.fullName,
        password: input.Password,
        role: input.Role,
        id: id,
      }),
      credentials: "include",
    });
    const result = await response.json();
    if (result) {
      messageApi.open({
        type: "success",
        content: "The user has been updated",
      });
      dispatch(doneEditing());
      setTimeout(() => {
        navigate("../all");
      }, 1000);
    }
  };

  return (
    <>
      {contextHolder}
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
          name="Password"
          placeholder="6 digit password"
          value={input.Password}
          className={style.input}
        />

        <Input
          onChange={inputHandler}
          name="Role"
          value={input.Role}
          placeholder="role: manager or waiter"
          className={style.input}
        />

        <Button
          onClick={changeHandler}
          className={style.button}
          htmlType="submit"
        >
          Change
        </Button>
      </div>
    </>
  );
}
