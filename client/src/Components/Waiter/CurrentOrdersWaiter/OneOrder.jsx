import React from "react";
import style from "./OneOrder.module.css";
import { useNavigate } from "react-router-dom";

export default function OneOrder({ el }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("../view_order");
  };

  return (
    <div onClick={handleClick} className={style.orders}>
      {el.number}
    </div>
  );
}
