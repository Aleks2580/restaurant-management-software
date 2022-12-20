import React from "react";
import { Menu } from "antd";
import style from "./ReservationsManager.module.css";
import { Link, Outlet } from "react-router-dom";
import { LoginOutlined, CheckOutlined } from "@ant-design/icons";

export default function ReservationsManager() {
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
                <Link to="/manager/main/reservations/new">
                  New reservation
                </Link>,
                "1",
                <LoginOutlined />
              ),
              getItem(
                <Link to="/manager/main/reservations/upcoming">
                  Upcoming reservations
                </Link>,
                "2",
                <CheckOutlined />
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
