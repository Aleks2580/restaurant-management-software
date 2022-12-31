import React, { useEffect, useState } from "react";
import style from "./UpcomingReservations.module.css";
import OneReservation from "./OneReservation";
import { Spin } from "antd";

export default function UpcomingReservations() {
  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState(true);

  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  //   const response = await fetch("http://localhost:4000/reservations", {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   const result = await response.json();
  //   setData(result.data);
  //   setLoading(false);
  // };
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

  // const handleDelete = async (e) => {
  //   const response = await fetch("http://localhost:4000/delete_reservation", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id: data.id }),
  //     credentials: "include",
  //   });
  //   console.log(data);
  // };
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
