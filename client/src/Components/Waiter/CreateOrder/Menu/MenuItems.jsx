import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./MenuItems.module.css";
import { getTable } from "../../../../store/createOrder/actionCreators";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../../../store/placeOrder/actionCreators";

export default function MenuItems() {
  const { item } = useParams();
  const [items, setItems] = useState([]);
  //const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: item }),
        credentials: "include",
      });
      const result = await response.json();

      setItems(result.items);
    })();
  }, [item]);

  const handleClick = (e) => {
    dispatch(placeOrder({ item: e.target.innerText, price: e.target.id }));
  };

  return (
    <div className={style.items}>
      {items?.map((item) => (
        <div
          name={item.name}
          onClick={handleClick}
          className={style.item}
          key={item.id}
          id={item.priceUSD}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
