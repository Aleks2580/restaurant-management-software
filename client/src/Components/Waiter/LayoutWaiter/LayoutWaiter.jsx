import React, { useState, useEffect } from "react";
import style from "./LayoutWaiter.module.css";
import OneTable from "./OneTable";

export default function LayoutWaiter() {
  const [tables, setTables] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("/tables", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setTables(result.tables.sort((a, b) => a.number - b.number));
    })();
  }, []);

  return (
    <div className={style.main}>
      {tables?.map((el) => (
        <OneTable el={el} key={el.id} />
      ))}
    </div>
  );
}
