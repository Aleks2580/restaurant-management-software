import React, { useState, useEffect } from "react";
import { InputNumber } from "antd";
import { useSelector } from "react-redux";
import style from "./CreateOrder.module.css";
import { Link, Outlet } from "react-router-dom";

export default function CreateOrder() {
  const [clickFood, setClickFood] = useState(false);
  const [clickDrinks, setClickDrinks] = useState(false);
  const [sections, setSections] = useState([]);

  const waiter = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.createOrder);

  const onChange = (value) => {};

  const handleClickFood = () => {
    setClickFood(!clickFood);
    setClickDrinks(false);
  };
  const handleClickDrinks = () => {
    setClickDrinks(!clickDrinks);
    setClickFood(false);
  };

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/menu_sections", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      setSections(result.sections);
    })();
  }, []);

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
            {clickFood ? (
              <div onClick={handleClickFood} className={style.foodclicked}>
                {sections[0].name}
              </div>
            ) : (
              <div onClick={handleClickFood} className={style.food}>
                {sections[0].name}
              </div>
            )}
          </Link>
          <Link to="/waiter/main/create_order/drinks">
            {clickDrinks ? (
              <div onClick={handleClickDrinks} className={style.drinksclicked}>
                {sections[1].name}
              </div>
            ) : (
              <div onClick={handleClickDrinks} className={style.drinks}>
                {sections[1].name}
              </div>
            )}
          </Link>
        </div>
      </div>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
