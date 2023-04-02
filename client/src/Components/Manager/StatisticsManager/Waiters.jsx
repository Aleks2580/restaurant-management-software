import React, { useState } from "react";
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
  return <div>Waiters</div>;
}
