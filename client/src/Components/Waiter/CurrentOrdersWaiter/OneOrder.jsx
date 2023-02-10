import React from "react";
import style from "./OneOrder.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tableNumber } from "../../../store/viewOrder/actionCreators";

export default function OneOrder({ el }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(tableNumber(el.number));
    navigate("../view_order");
  };

  return (
    <div onClick={handleClick} className={style.orders}>
      {el.number}
    </div>
  );
}
