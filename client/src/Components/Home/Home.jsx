import React from "react";
import { Link } from "react-router-dom";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import style from "./Home.module.css";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link to="/waiter">Waiter</Link>,
    "1",
    <UserOutlined className={style.icon} />
  ),
  getItem(
    <Link to="/manager">Manager</Link>,
    "2",
    <DesktopOutlined className={style.icon} />
  ),
];
const Home = () => {
  return (
    <div className={style.main}>
      <div
        style={{
          width: 150,
        }}
      >
        <Menu className={style.menu} defaultOpenKeys={["sub1"]} items={items} />
      </div>
      <div className={style.div_span}>
        <p className={style.popout}>RESTAURANT MANAGEMENT SYSTEM</p>
      </div>
    </div>
  );
};
export default Home;
