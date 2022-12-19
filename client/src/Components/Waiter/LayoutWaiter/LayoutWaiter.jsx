import React, { useState, useEffect } from "react";
import style from "./LayoutWaiter.module.css";
import OneTable from "./OneTable";

export default function LayoutWaiter() {
  const [tables, setTables] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/tables", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setTables(result.tables);
      //setLoading(false);
    })();
  });

  return (
    <>
      <div className={style.first_row}>
        {tables?.map((el) => (
          <OneTable el={el} key={el.id} />
        ))}
      </div>

      {/* <div className={style.first_row}>
        <div className={style.table_first_row}>101</div>
        <div className={style.table_first_row}>102</div>
        <div className={style.table_first_row}>103</div>
        <div className={style.table_first_row}>104</div>
        <div className={style.table_first_row}>105</div>
      </div>
      <div className={style.second_row}>
        <div className={style.table_second_row}>201</div>
        <div className={style.table_second_row}>202</div>
        <div className={style.table_second_row}>203</div>
        <div className={style.table_second_row}>204</div>
        <div className={style.table_second_row}>205</div>
      </div>
      <div className={style.third_row}>
        <div className={style.table_third_row}>301</div>
        <div className={style.table_third_row}>302</div>
        <div className={style.table_third_row}>303</div>
        <div className={style.table_third_row}>304</div>
        <div className={style.table_third_row}>304</div>
      </div> */}
    </>
  );
}
