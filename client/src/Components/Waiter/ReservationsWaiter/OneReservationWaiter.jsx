import React from "react";
import style from "./OneReservationWaiter.module.css";

export default function OneReservationWaiter({ el }) {
  return (
    <div className={style.data}>
      <div className={style.reservationBox}>
        <div className={style.date}>{el.date}</div>
        <div className={style.time}>{el.time}</div>
        <div className={style.name}>{el.name}</div>
        <div className={style.guests}>{el.guests} guests</div>
      </div>
    </div>
  );
}
