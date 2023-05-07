import React, { useState, useEffect } from "react";
import style from "./CurrentOrders.module.css";
import OneOrder from "./OneOrder";

export default function CurrentOrders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("/current_orders", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setOrders(result.orders.sort((a, b) => a.number - b.number));
    })();
  }, []);

  return (
    <div className={style.main}>
      {orders?.map((el) => (
        <OneOrder el={el} key={el.id} />
      ))}
    </div>
  );
}
