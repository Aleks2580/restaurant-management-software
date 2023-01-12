import React, { useState, useEffect } from "react";
import style from "./Food.module.css";

export default function Food() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/menu_categories_food",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();

      setCategories(result.categories);
    })();
  }, []);
  console.log(categories);
  return (
    <div className={style.main}>
      <div className={style.category}>Salads</div>
      <div className={style.category}>Soups</div>
      <div className={style.category}>Main</div>
      <div className={style.category}>Pizza</div>
      <div className={style.category}>Deserts</div>
    </div>
  );
}
