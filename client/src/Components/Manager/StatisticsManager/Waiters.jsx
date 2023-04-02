import React, { useState, useEffect } from "react";
import { DatePicker, Button, Table, message } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import style from "./Revenue.module.css";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const { RangePicker } = DatePicker;

export default function Waiters() {
  const [waiters, setWaiters] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `http://localhost:4000/products?page=${page}&pageSize=${pageSize}&section=${filter.section}&category=${filter.category}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      setProducts(result.products);
      setLoading(false);
      setTotal(result.totalCount);
    })();
  }, []);

  return (
    <div className={style.filter_div}>
      Waiter
      <select
        //onChange={handleChange}
        className={style.select}
        name="section"
        //value={filter.section}
      >
        <option className={style.option} value="all" name="section">
          all
        </option>
        {/* {sections?.map((el) => (
        <option className={style.option} value={el.name} name="section">
          {el.name}
        </option>
      ))} */}
      </select>
    </div>
  );
}
