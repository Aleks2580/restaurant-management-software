import React, { useState } from "react";
import { InputNumber } from "antd";
import { useSelector } from "react-redux";
import style from "./CreateOrder.module.css";
import { Link, Outlet } from "react-router-dom";

export default function CreateOrder() {
  const [clickFood, setClickFood] = useState(false);
  const [clickDrinks, setClickDrinks] = useState(false);

  const waiter = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.createOrder);

  const onChange = (value) => {};

  const handleClick = (e) => {};

  return (
    <div className={style.main}>
      <div className={style.data}>
        <div>
          <div>Waiter: {waiter}</div>
          <div>Table number:{tableNumber}</div>
          <div>
            Number of guests:
            <InputNumber
              min={1}
              max={30}
              defaultValue={2}
              onChange={onChange}
            />
          </div>
          <div>Total: 0$</div>
        </div>
        <div className={style.menu}>
          <Link name="food" to="/waiter/main/create_order/food">
            <div onClick={handleClick} className={style.food}>
              FOOD
            </div>
          </Link>
          <Link to="/waiter/main/create_order/drinks">
            <div onClick={handleClick} className={style.drinks} name="drinks">
              DRINKS
            </div>
          </Link>
        </div>
      </div>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
