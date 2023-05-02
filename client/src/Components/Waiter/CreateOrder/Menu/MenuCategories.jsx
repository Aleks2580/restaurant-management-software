import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import style from "./MenuCategories.module.css";

export default function MenuCategories() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch("/menu_categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
        credentials: "include",
      });
      const result = await response.json();

      setCategories(result.categories);
    })();
  }, [id]);

  return (
    <>
      <div className={style.main}>
        <div className={style.categories}>
          {categories.map((category) => (
            <Link key={category.id} to={`${category.id}`}>
              <div className={style.category}>{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </>
  );
}
