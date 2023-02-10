import React, { useEffect, useState } from "react";
import style from "./UpcomingReservations.module.css";
import OneReservation from "./OneReservation";
import { Spin } from "antd";

export default function UpcomingReservations() {
  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setReservations(result.data);
      setLoading(false);
      const noDuplicateDates = [...new Set(result.data.map((el) => el.date))];
      setDates(noDuplicateDates);
    })();
  }, []);

  const handleChange = async (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const response = await fetch("http://localhost:4000/reservations_filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: e.target.value,
      }),
      credentials: "include",
    });
    const result = await response.json();

    setReservations(result.dates);
  };

  return !loading ? (
    <>
      <div className={style.filter_div}>
        <select onChange={handleChange} className={style.select}>
          <option className={style.option} value="all" name="all">
            all
          </option>
          {dates?.map((el) => (
            <option className={style.option} value={el} name={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      {reservations?.map((el) => (
        <OneReservation el={el} key={el.id} />
      ))}
    </>
  ) : (
    <Spin size="large" />
  );
}
