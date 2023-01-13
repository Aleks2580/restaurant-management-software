import React, { useState, useEffect } from "react";
import { InputNumber } from "antd";
import { useSelector } from "react-redux";
import style from "./CreateOrder.module.css";
import { Link, Outlet } from "react-router-dom";

export default function CreateOrder() {
  const [sections, setSections] = useState([{ name: "" }, { name: "" }]);

  const waiter = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.createOrder);

  const onChange = (value) => {};

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
          {sections?.map((section) => (
            <Link
              key={section.id}
              to={`/waiter/main/create_order/${section.id}`}
            >
              <div className={style.section}>{section.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
