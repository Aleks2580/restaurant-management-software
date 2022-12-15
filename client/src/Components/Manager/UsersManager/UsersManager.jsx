import React from "react";
import { Menu } from "antd";
import style from "./UsersManager.module.css";
import { Link, Outlet } from "react-router-dom";
import { ContactsOutlined, PlusOutlined } from "@ant-design/icons";

export default function UsersManager() {
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
                <Link to="/manager/main/users/all">All users</Link>,
                "1",
                <ContactsOutlined />
              ),
              getItem(
                <Link to="/manager/main/users/new">New user</Link>,
                "2",
                <PlusOutlined />
              ),
            ]}
          />
          {/* <Link to="/manager/main/users/all">
            <Button className={style.button} type="primary">
              All users
            </Button>
          </Link>
          <Link to="/manager/main/users/new">
            <Button className={style.button} type="primary">
              New user
            </Button>
          </Link> */}
        </div>
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
