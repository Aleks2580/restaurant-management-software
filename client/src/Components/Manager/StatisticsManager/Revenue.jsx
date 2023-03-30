import React, { useState } from "react";
import { DatePicker, Button, message } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import style from "./Revenue.module.css";
const { RangePicker } = DatePicker;

export default function Revenue() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState("");

  const handleDate = (dates) => {
    const formattedDates = dates.map((date) => date.format("YYYY-MM-DD"));
    setDateRange(formattedDates);
  };

  const handleSearchButton = async () => {
    const key = "updatable";
    const response = await fetch("http://localhost:4000/statistics_revenue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dateRange }),
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
  };
  console.log(dateRange);
  return (
    <div className={style.main_div}>
      <div>
        <RangePicker onChange={handleDate} />
        <Button
          shape="circle"
          className={style.button_search}
          icon={<SearchOutlined />}
          onClick={handleSearchButton}
        />
        <Button
          className={style.button_search}
          icon={<CloseOutlined />}
          onClick={handleSearchButton}
        />
      </div>
      <div className={style.data}>Data</div>
      <div>
        <Button className={style.button_download} icon={<DownloadOutlined />}>
          download
        </Button>
      </div>
    </div>
  );
}
