import React, { useState, useEffect } from "react";
import style from "./ReservationsWaiter.module.css";
import { Spin, Empty } from "antd";
import OneReservationWaiter from "./OneReservationWaiter";

export default function ReservationsWaiter() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {reservations.length !== 0 ? (
        reservations.map((el) => <OneReservationWaiter el={el} key={el.id} />)
      ) : (
        <Empty />
      )}
    </>
  ) : (
    <Spin size="large" />
  );
}
