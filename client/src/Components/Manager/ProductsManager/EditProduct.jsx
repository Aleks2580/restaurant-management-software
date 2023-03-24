import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";
import style from "./EditProduct.module.css";
import { doneEditing } from "../../../store/editProduct/actionCreators";

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, price } = useSelector((state) => state.editProduct);
  const [input, setInput] = useState({
    name: name,
    price: price,
  });

  return (
    <>
      <div className={style.form}>
        <Input
          //onChange={inputHandler}
          name="fullName"
          placeholder="name"
          value={input.name}
          className={style.input}
        />

        <Input
          //onChange={inputHandler}
          name="Role"
          value={input.price}
          placeholder="price"
          className={style.input}
        />

        <Button
          //onClick={changeHandler}
          className={style.button}
          htmlType="submit"
        >
          Change
        </Button>
      </div>
    </>
  );
}
