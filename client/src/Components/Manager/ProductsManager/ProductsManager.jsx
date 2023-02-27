import React from "react";
import { Menu } from "antd";
import style from "./ProductsManager.module.css";
import { Link, Outlet } from "react-router-dom";
import {
  BarcodeOutlined,
  PlusOutlined,
  AppstoreAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";

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
                <Link to="/manager/main/products/new_product">
                  New product
                </Link>,
                "2",
                <PlusOutlined />
              ),
              getItem(
                <Link to="/manager/main/products/new_category">
                  New category
                </Link>,
                "3",
                <AppstoreAddOutlined />
              ),
              getItem(
                <Link to="/manager/main/products/new_section">
                  New section
                </Link>,
                "4",
                <FolderAddOutlined />
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
