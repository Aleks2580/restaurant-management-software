import React, { useState, useEffect } from "react";
import style from "./CurrentOrdersWaiter.module.css";

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

  return <div>CurrentOrders</div>;
}
