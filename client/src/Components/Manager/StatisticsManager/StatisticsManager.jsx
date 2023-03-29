import React from "react";
import { Menu } from "antd";
import style from "./StatisticsManager.module.css";
import { Link, Outlet } from "react-router-dom";
import {
  MoneyCollectOutlined,
  AuditOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export default function StatisticsManager() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  return (
    <>
      <div className={style.main_div}>
        <div className={style.buttons}>
          <Menu
            className={style.menu}
            theme="light"
            mode="inline"
            items={[
              getItem(
                <Link to="/manager/main/statistics/revenue">Revenue</Link>,
                "1",
                <MoneyCollectOutlined />
              ),
              getItem(
                <Link to="/manager/main/statistics/waiters">Waiters</Link>,
                "2",
                <AuditOutlined />
              ),
              getItem(
                <Link to="/manager/main/statistics/products">Products</Link>,
                "3",
                <ShopOutlined />
              ),
            ]}
          />
        </div>
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
