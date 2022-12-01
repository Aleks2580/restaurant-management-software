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
  getItem(<Link to="/waiter">Waiter</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/manager">Manager</Link>, "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
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
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <p className={style.popout}>
        <span>R</span>
        <span>E</span>
        <span>S</span>
        <span>T</span>
        <span>A</span>
        <span>U</span>
        <span>R</span>
        <span>A</span>
        <span>N</span>
        <span>T</span>
        <br />
        <span>M</span>
        <span>A</span>
        <span>N</span>
        <span>A</span>
        <span>G</span>
        <span>E</span>
        <span>M</span>
        <span>E</span>
        <span>N</span>
        <span>T</span>
        <br />
        <span>S</span>
        <span>Y</span>
        <span>S</span>
        <span>T</span>
        <span>E</span>
        <span>M</span>
      </p>
    </div>
  );
};
export default Home;
