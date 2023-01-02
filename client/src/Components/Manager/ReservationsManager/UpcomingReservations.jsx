import React, { useEffect, useState } from "react";
import style from "./UpcomingReservations.module.css";
import OneReservation from "./OneReservation";
import { Spin } from "antd";

export default function UpcomingReservations() {
  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setReservations(result.data);
      setLoading(false);
    })();
  }, []);

  return !loading ? (
    <>
      {reservations?.map((el) => (
        <OneReservation el={el} key={el.id} />
      ))}
    </>
  ) : (
    <Spin size="large" />
  );
}
