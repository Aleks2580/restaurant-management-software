import React, { useState, useEffect } from "react";
import style from "./ReservationsWaiter.module.css";
import { Spin } from "antd";
import OneReservationWaiter from "./OneReservationWaiter";

export default function ReservationsWaiter() {
  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch(
        "http://localhost:4000/todays_reservations",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      setReservations(result.data);
      setLoading(false);
    })();
  }, []);

  return !loading ? (
    <>
      {reservations?.map((el) => (
        <OneReservationWaiter el={el} key={el.id} />
      ))}
    </>
  ) : (
    <Spin size="large" />
  );
}
