import React, { useState, useEffect } from "react";
import { InputNumber, Button } from "antd";
import { useSelector } from "react-redux";
import style from "./CreateOrder.module.css";
import { Link, Outlet } from "react-router-dom";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

export default function CreateOrder() {
  const [sections, setSections] = useState([{ name: "" }, { name: "" }]);

  const waiter = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.createOrder);
  const order = useSelector((state) => state.placeOrder);
  const total = useSelector((state) => state.total);

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
    <>
      <div className={style.main}>
        <div className={style.data}>
          <div className={style.info}>
            <div className={style.name}>Waiter: {waiter}</div>
            <div className={style.table}>Table number:{tableNumber}</div>
            <div>
              Number of guests:
              <InputNumber
                className={style.input_guests}
                min={1}
                max={30}
                defaultValue={2}
                onChange={onChange}
              />
            </div>
          </div>
          <div className={style.menu}>
            {sections?.map((section) => (
              <Link
                key={section.id}
                to={`/waiter/main/create_order/${section.id}`}
              >
                <div name={section.name} className={style.section}>
                  {section.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={style.outlet}>
          <Outlet />
        </div>
        <div className={style.button_done}>
          <Button type="primary" className={style.button_done}>
            Done
          </Button>
        </div>
      </div>
      <div className={style.main_order}>
        <div className={style.order}>ORDER:</div>
        {order?.map((el) => (
          <div>
            <div>{el.item}</div>
            <div>{el.price}$</div>
            <PlusOutlined />
            <MinusOutlined />
            <DeleteOutlined />
          </div>
        ))}
        <div className={style.total}>TOTAL:{total}$</div>
      </div>
    </>
  );
}
