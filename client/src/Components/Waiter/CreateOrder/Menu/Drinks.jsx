import React, { useState, useEffect } from "react";
import style from "./Drinks.module.css";

export default function Drinks() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/menu_categories_drinks",
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
      <div className={style.category}>Tea</div>
      <div className={style.category}>Coffee</div>
      <div className={style.category}>Cocktails</div>
      <div className={style.category}>Beer</div>
      <div className={style.category}>Soft</div>
    </div>
  );
}
