import React from "react";
import style from "./Food.module.css";

export default function Food() {
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
