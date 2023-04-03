import React, { useState, useEffect } from "react";
import { DatePicker, Button, Table, message } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import style from "./Waiters.module.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function Waiters() {
  const [waiters, setWaiters] = useState([]);
  const [data, setData] = useState([]);
  const [filterAndDates, setFilterAndDates] = useState({
    waiterName: "all",
    dateRange: [],
  });

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/statistics_waiters_filter`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      setWaiters(result.waiters);
    })();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Waiter",
      dataIndex: "waiter",
      key: "waiter",
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

  const handleChange = async (e, dates) => {
    setFilterAndDates({
      ...filterAndDates,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length > 0) {
      const formattedDates = dates.map((date) =>
        dayjs(date).format("YYYY-MM-DD")
      );
      setFilterAndDates({ ...filterAndDates, dateRange: formattedDates });
    } else {
      setFilterAndDates({ ...filterAndDates, dateRange: null });
    }
  };
  const handleSearchButton = async () => {
    const response = await fetch("http://localhost:4000/statistics_waiters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filterAndDates }),
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
  };

  const handleResetButton = () => {
    setFilterAndDates({ waiterName: "all", dateRange: [] });
  };

  return (
    <div className={style.main_div}>
      <div className={style.filter_dates}>
        <div className={style.filter_div}>
          <label htmlFor="waiter">Waiter:</label>
          <select
            onChange={handleChange}
            className={style.select}
            name="waiterName"
            value={filterAndDates.waiterName}
          >
            <option className={style.option} value="all" name="waiterName">
              all
            </option>
            {waiters?.map((el) => (
              <option
                className={style.option}
                value={el.waiterName}
                name="waiterName"
              >
                {el.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <RangePicker
            key={filterAndDates.dateRange?.length}
            onChange={handleDateRangeChange}
            value={[
              filterAndDates.dateRange?.[0]
                ? dayjs(filterAndDates.dateRange[0])
                : null,
              filterAndDates.dateRange?.[1]
                ? dayjs(filterAndDates.dateRange[1])
                : null,
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
      </div>
      <div className={style.data}>
        <div className={style.data_all}>
          {/* {Object.entries(overallData)?.map(([key, value]) => (
            <div key={key} className={style.total_info}>
              <div className={style.key}>{key}:</div> <div>{value}</div>
            </div>
          ))}
          <div>ACPG: {averageCheckPerGuest}$</div> */}
        </div>

        <Table
          className={style.table_revenue}
          //dataSource={dataSourse}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </div>
      <div>
        <Button
          className={style.button_download}
          icon={<DownloadOutlined />}
          // onClick={() => {
          //   if (dataSourse.length > 0) {
          //     exportToExcel(dataSourse);
          //   } else {
          //     message.warning("No data available to download!");
          //   }
          // }}
        >
          download PDF
        </Button>
      </div>
    </div>
  );
}
