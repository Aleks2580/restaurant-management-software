import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";
import style from "./EditProduct.module.css";
import { doneEditing } from "../../../store/editProduct/actionCreators";

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, price, id } = useSelector((state) => state.editProduct);
  const [input, setInput] = useState({
    name: name,
    price: price,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  console.log(input);

  const changeHandler = async () => {
    const response = await fetch("http://localhost:4000/edit_product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        price: input.price,
        id,
      }),
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    if (result === "Done") {
      messageApi.open({
        type: "success",
        content: "The product has been updated",
      });
      dispatch(doneEditing());
      setTimeout(() => {
        navigate("../all");
      }, 1000);
    }

    if (result === "Product with this name already exists") {
      messageApi.open({
        type: "error",
        content: "Product with this name already exists",
      });
      // dispatch(doneEditing());
      // setTimeout(() => {
      //   navigate("../all");
      // }, 1000);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={style.form}>
        <Input
          onChange={inputHandler}
          name="name"
          placeholder="name"
          value={input.name}
          className={style.input}
        />

        <Input
          onChange={inputHandler}
          name="price"
          value={input.price}
          placeholder="price"
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
