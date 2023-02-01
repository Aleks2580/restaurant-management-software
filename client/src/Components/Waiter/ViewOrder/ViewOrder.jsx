import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputNumber, Button, message } from "antd";
import style from "./ViewOrder.module.css";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ViewOrder() {
  const tableNumber = useSelector((state) => state.viewOrder);
  const [order, setOrder] = useState([""]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/view_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableNumber }),
        credentials: "include",
      });
      const result = await response.json();
      setOrder(result.order);
      // if (order.items) {
      //   setItems(JSON.parse(order.items));
      // } else {
      //   setItems([]);
      // }
    })();
  }, [tableNumber]);

  console.log(items);
  console.log(order);

  return (
    <div className={style.main}>
      <section className={style.section_main}>
        <div className={style.data}>
          <div className={style.info}>
            <div className={style.info_name}>Waiter: {order.waiterName}</div>
            <div className={style.info_table}>
              Table number:{order.tableNumber}
            </div>
            <div className={style.info_guests}>
              <span>Number of guests: {order.guests}</span>
            </div>
          </div>
        </div>
      </section>
      <div className={style.main_order}>
        <div className={style.order}>
          ORDER:
          <div className={style.name_amount_price}>
            <div className={style.name}>Name</div>
            <div className={style.quantity}>Quantity</div>
            <div className={style.price}>Price</div>
            <div className={style.total}>Total</div>
          </div>
          {JSON.parse(order.items)?.map((item) => (
            <div className={style.item}>
              <div className={style.item_name}>{item.item}</div>
              <div className={style.item_quantity}>{item.quantity}</div>
              <div className={style.item_price}>{item.price}$</div>
              <div className={style.item_total}>
                {item.price * item.quantity}$
              </div>
            </div>
          ))}
        </div>

        <div className={style.total_sum}>TOTAL: {order.total}$</div>
      </div>
    </div>
  );
}
