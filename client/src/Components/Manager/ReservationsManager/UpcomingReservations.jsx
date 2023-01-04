import React, { useEffect, useState } from "react";
import style from "./UpcomingReservations.module.css";
import OneReservation from "./OneReservation";
import { Spin, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

// const items = [
//   {
//     label: <a href="https://www.antgroup.com">1st menu item</a>,
//     key: "0",
//   },
//   {
//     label: <a href="https://www.aliyun.com">2nd menu item</a>,
//     key: "1",
//   },
//   {
//     label: "3rd menu item",
//     key: "2",
//   },

export default function UpcomingReservations() {
  const [reservations, setReservations] = useState();
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState();

  const items = [
    // {
    //   label: "",
    //   key: "",
    // },
    // ,
    // {
    //   label: <a href="https://www.aliyun.com">2nd menu item</a>,
    //   key: "1",
    // },
    // {
    //   label: "3rd menu item",
    //   key: "2",
    // },
  ];

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setReservations(result.data);
      setLoading(false);
      const datesFromBack = result.data.map((el) => el.date);
      const test = datesFromBack.map((el) =>
        items.push({ label: el, key: datesFromBack.indexOf(el) })
      );
      //setDates(items);
    })();
  }, []);

  console.log(dates);

  //console.log(dates);

  return !loading ? (
    <>
      <Dropdown
        className={style.filter}
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Filter
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {reservations?.map((el) => (
        <OneReservation el={el} key={el.id} />
      ))}
    </>
  ) : (
    <Spin size="large" />
  );
}
