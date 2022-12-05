import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import style from "./MainManager.module.css";
import { StyleProvider } from "@ant-design/cssinjs";
const { Header, Content, Footer, Sider } = Layout;

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
    <Link to="/manager/main/dashboard">Dashboard</Link>,
    "1",
    <UploadOutlined />
  ),
  getItem(<Link to="/manager/main/users">Users</Link>, "2", <UserOutlined />),
  getItem(
    <Link to="/manager/main/users">Statistics</Link>,
    "3",
    <VideoCameraOutlined />
  ),
  getItem(
    <Link to="/manager/main/users">Products</Link>,
    "4",
    <VideoCameraOutlined />
  ),
  getItem(
    <Link to="/manager/main/users">Stock</Link>,
    "5",
    <VideoCameraOutlined />
  ),
];

const MainManager = () => (
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
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
    <Layout className={style.layout_secondary}>
      <Header
        className={style.header}
        // className="site-layout-sub-header-background"
        style={{
          padding: 0,
        }}
      >
        <div className={style.header_div}>
          <span className={style.welcome}>Welcome, Admin!</span>
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
export default MainManager;
