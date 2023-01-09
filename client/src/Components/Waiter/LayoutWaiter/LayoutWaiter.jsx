import React, { useState, useEffect } from "react";
import style from "./LayoutWaiter.module.css";
import OneTable from "./OneTable";

export default function LayoutWaiter() {
  const [tables, setTables] = useState();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/tables", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setTables(result.tables.sort((a, b) => a.number - b.number));
    })();
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };
  console.log(clicked);

  return (
    <>
      {tables?.map((el) => (
        <OneTable onClick={handleClick} el={el} key={el.id} />
      ))}
    </>
  );
}
