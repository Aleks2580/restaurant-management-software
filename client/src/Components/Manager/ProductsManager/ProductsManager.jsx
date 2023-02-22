import React from "react";
import { Menu } from "antd";
import style from "./ProductsManager.module.css";
import { Link, Outlet } from "react-router-dom";
import { BarcodeOutlined, PlusOutlined } from "@ant-design/icons";

export default function ProductsManager() {
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
                <Link to="/manager/main/products/all">All products</Link>,
                "1",
                <BarcodeOutlined />
              ),
              getItem(
                <Link to="/manager/main/products/new">New product</Link>,
                "2",
                <PlusOutlined />
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
