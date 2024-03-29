import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./MenuItems.module.css";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../../../store/placeOrder/actionCreators";
import { addTotal } from "../../../../store/total/actionCreators";
import { useSelector } from "react-redux";

export default function MenuItems() {
  const { item } = useParams();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.placeOrder);

  useEffect(() => {
    (async function () {
      const response = await fetch("/items", {
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

  const handleClick = (e, price) => {
    dispatch(
      placeOrder({
        item: e.target.innerText,
        quantity: 1,
        price: price,
      })
    );
    dispatch(addTotal(price));
  };

  return (
    <div className={style.items}>
      {items?.map((item) => (
        <div
          name={item.name}
          onClick={(e, price) => handleClick(e, item.priceUSD)}
          className={style.item}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
