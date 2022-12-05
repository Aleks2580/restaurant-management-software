import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import style from "./MainManager.module.css";
import { StyleProvider } from "@ant-design/cssinjs";
const { Header, Content, Footer, Sider } = Layout;

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
        defaultSelectedKeys={["4"]}
        items={[
          UserOutlined,
          VideoCameraOutlined,
          UploadOutlined,
          UserOutlined,
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: `nav ${index + 1}`,
        }))}
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
          content
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
