import React, { useRef, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  LayoutOutlined,
  TeamOutlined,
  SecurityScanOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import style from "./MainWaiter.module.css";
import { logoutUser } from "../../../store/loginUser/actionCreators";
import { useDispatch, useSelector } from "react-redux";
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

export default function MainWaiter() {
  const time = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.loginUser.name);
  const [menuClosed, setMenuClosed] = useState();
  const [menuFolded, setMenuFolded] = useState();

  useEffect(() => {
    const clock = setInterval(() => {
      time.current.innerText = new Date().toLocaleTimeString(
        navigator.language,
        { hour: "2-digit", minute: "2-digit" }
      );
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  async function handleLogout() {
    const response = await fetch("http://localhost:4000/logout", {
      method: "GET",
      credentials: "include",
    });
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <Layout className={style.layout}>
      <Sider
        className={style.sider}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
          setMenuFolded(broken);
        }}
        onCollapse={(collapsed) => {
          setMenuClosed(collapsed);
        }}
      >
        <div className="logo" />
        <Menu
          className={style.menu}
          theme="light"
          mode="inline"
          items={[
            getItem(
              <Link to="/waiter/main/layout">Layout</Link>,
              "1",
              <LayoutOutlined className={style.icon} />
            ),
            getItem(
              <Link to="/waiter/main/orders">Current Orders</Link>,
              "2",
              <SecurityScanOutlined className={style.icon} />
            ),

            getItem(
              <Link to="/waiter/main/reservations">Today's bookings</Link>,
              "3",
              <TeamOutlined className={style.icon} />
            ),
            getItem(
              <Link onClick={handleLogout} to="/">
                Logout
              </Link>,
              "4",
              <LogoutOutlined className={style.icon} />
            ),
          ]}
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
            <span className={style.welcome}>Welcome, {name}!</span>
            {menuClosed || !menuFolded ? (
              <span ref={time} className={style.time} />
            ) : (
              <span ref={time} style={{ display: "none" }} />
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            display: "flex",
            justifyContent: "center",
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
}
