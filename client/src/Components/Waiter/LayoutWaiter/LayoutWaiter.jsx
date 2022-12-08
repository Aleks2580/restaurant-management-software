import React from "react";
import style from "./LayoutWaiter.module.css";

export default function LayoutWaiter() {
  return (
    <>
      <div className={style.first_row}>
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
      </div>
    </>
  );
}
