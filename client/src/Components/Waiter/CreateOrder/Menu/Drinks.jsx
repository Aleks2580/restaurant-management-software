import React from "react";
import style from "./Drinks.module.css";

export default function Drinks() {
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
