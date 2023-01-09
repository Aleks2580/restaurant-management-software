import React, { useState, useEffect } from "react";
import style from "./CurrentOrdersWaiter.module.css";
import OneOrder from "./OneOrder";

export default function CurrentOrders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/current_orders", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setOrders(result.orders);
    })();
  }, []);

  return (
    <>
      {orders?.map((el) => (
        <OneOrder el={el} key={el.id} />
      ))}
    </>
  );
}
