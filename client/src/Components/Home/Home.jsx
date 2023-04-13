import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
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
    <PieChartOutlined className={style.icon} />
  ),
  getItem(
    <Link to="/manager">Manager</Link>,
    "2",
    <DesktopOutlined className={style.icon} />
  ),
  getItem("Option 3", "3", <ContainerOutlined className={style.icon} />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={style.home}>
      <div className={style.main}>
        <div
          style={{
            width: 150,
          }}
        >
          <Button
            className={style.button_menu}
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            className={style.menu}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
        <p className={style.popout}>RESTAURANT MANAGEMENT SYSTEM</p>
      </div>
    </div>
  );
};
export default Home;
