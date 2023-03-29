import React, { useState } from "react";
import { DatePicker, Button } from "antd";
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

  console.log(dateRange);

  const handleSearchButton = async () => {
    // const formattedDates = dateRange.map((date) =>
    //   moment(date).format("YYYY-MM-DD")
    // );
    // console.log(formattedDates);
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
      <div className={style.data}>Data</div>
      <div>
        <Button className={style.button_download} icon={<DownloadOutlined />}>
          download
        </Button>
      </div>
    </div>
  );
}
