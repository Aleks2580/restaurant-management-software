import React from "react";
import { InputNumber } from "antd";
import { useSelector } from "react-redux";
import { getTable } from "../../../store/createOrder/actionCreators";

export default function CreateOrder() {
  const waiter = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.createOrder);
  console.log(tableNumber);
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <div>
      <div>Waiter: {waiter}</div>
      <div>Table number:{tableNumber}</div>
      <div>
        Number of guests:
        <InputNumber min={1} max={30} defaultValue={2} onChange={onChange} />
      </div>
    </div>
  );
}
