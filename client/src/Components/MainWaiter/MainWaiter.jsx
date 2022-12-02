import React from "react";
import { Layout } from "antd";
import style from "./MainWaiter.module.css";
const { Header, Footer, Sider, Content } = Layout;
const MainWaiter = () => (
  <Layout className={style.layout}>
    <Sider>Sider</Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
);
export default MainWaiter;
