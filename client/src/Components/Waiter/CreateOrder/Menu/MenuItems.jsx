import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./MenuItems.module.css";

export default function MenuItems() {
  const { item } = useParams();
  const [items, setItems] = useState([]);

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

  return (
    <div className={style.items}>
      {items?.map((item) => (
        <div className={style.item} key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
