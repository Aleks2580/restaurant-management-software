import React, { useState } from "react";
import { DatePicker, Button, Table, Pagination } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import style from "./Revenue.module.css";
import moment from "moment";
const { RangePicker } = DatePicker;

export default function Revenue() {
  const [perDateData, setPerDateData] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [averageCheckPerGuest, setAverageCheckPerGuest] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDate = (dates) => {
    const formattedDates = dates?.map((date) => date.format("YYYY-MM-DD"));
    const [startDate, endDate] = formattedDates;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const isValidDate = (dateString) => {
    const dateFormat = "YYYY-MM-DD";
    const date = moment(dateString, dateFormat);
    return date.isValid();
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
    setAverageCheckPerGuest(result.revenue.ACPG);
  };

  const handleResetButton = () => {
    setStartDate("");
    setEndDate("");
    setPerDateData([]);
    setOverallData([]);
    setAverageCheckPerGuest([]);
  };
  const dataSourse = perDateData;
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total guests",
      dataIndex: "totalGuests",
      key: "totalGuests",
    },
    {
      title: "Total revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
  ];

  return (
    <div className={style.main_div}>
      <div>
        <RangePicker
          onChange={handleDate}
          value={[
            isValidDate(startDate) ? moment(startDate) : null,
            isValidDate(endDate) ? moment(endDate) : null,
          ]}
        />
        <Button
          shape="circle"
          className={style.button_search}
          icon={<SearchOutlined />}
          onClick={handleSearchButton}
        />
        <Button
          className={style.button_reset}
          icon={<CloseOutlined />}
          onClick={handleResetButton}
        />
      </div>
      <div className={style.data}>
        <div className={style.data_all}>
          {Object.entries(overallData)?.map(([key, value]) => (
            <div key={key} className={style.total_info}>
              <div className={style.key}>{key}:</div> <div>{value}</div>
            </div>
          ))}
          <div>ACPG: {averageCheckPerGuest}$</div>
        </div>

        <Table
          className={style.table_revenue}
          dataSource={dataSourse}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </div>

      <div>
        <Button className={style.button_download} icon={<DownloadOutlined />}>
          download PDF
        </Button>
      </div>
    </div>
  );
}
