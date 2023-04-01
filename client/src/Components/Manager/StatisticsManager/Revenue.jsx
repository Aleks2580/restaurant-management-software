import React, { useState } from "react";
import { DatePicker, Button, message, Table, Pagination } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import style from "./Revenue.module.css";
const { RangePicker } = DatePicker;

export default function Revenue() {
  const [perDateData, setPerDateData] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDate = (dates) => {
    const formattedDates = dates.map((date) => date.format("YYYY-MM-DD"));
    const [startDate, endDate] = formattedDates;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleSearchButton = async () => {
    const key = "updatable";
    const response = await fetch("http://localhost:4000/statistics_revenue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDate, endDate }),
      credentials: "include",
    });
    const result = await response.json();
    setPerDateData(result.revenue.perDate);
    setOverallData(result.revenue.overall);
  };

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
      <div className={style.data}>
        {Object.entries(overallData).map(([key, value]) => (
          <div>
            {key}
            {value}
          </div>
        ))}
      </div>
      <div>
        <Button className={style.button_download} icon={<DownloadOutlined />}>
          download
        </Button>
      </div>
    </div>
  );
}
