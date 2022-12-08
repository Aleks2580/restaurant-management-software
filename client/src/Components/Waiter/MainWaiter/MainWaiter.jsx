import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  LayoutOutlined,
  TeamOutlined,
  SecurityScanOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import style from "./MainWaiter.module.css";
const { Header, Footer, Sider, Content } = Layout;

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
    <Link to="/waiter/main/layout">Layout</Link>,
    "1",
    <LayoutOutlined />
  ),
  getItem(
    <Link to="/waiter/main/orders">Current Orders</Link>,
    "2",
    <SecurityScanOutlined />
  ),

  getItem(
    <Link to="/waiter/main/reservations">Reservations</Link>,
    "3",
    <TeamOutlined />
  ),
  getItem(<Link to="/">Logout</Link>, "4", <LogoutOutlined />),
];
const MainWaiter = () => (
  <Layout className={style.layout}>
    <Sider
      className={style.sider}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu
        className={style.menu}
        theme="light"
        mode="inline"
        // defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
    <Layout className={style.layout_secondary}>
      <Header
        className={style.header}
        style={{
          padding: 0,
        }}
      >
        <div className={style.header_div}>
          <span className={style.welcome}>Welcome, Name!</span>
          <span className={style.time}>16:46</span>
        </div>
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div
          className={style.content}
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        className={style.footer}
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  </Layout>
);
export default MainWaiter;
