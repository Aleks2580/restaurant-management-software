import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import style from "./Revenue.module.css";
const { RangePicker } = DatePicker;

export default function Revenue() {
  const [data, setData] = useState([]);

  const handleSearchButton = async () => {};
  return (
    <div className={style.main_div}>
      <div>
        <RangePicker />
        <Button
          shape="circle"
          className={style.button_search}
          icon={<SearchOutlined />}
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
