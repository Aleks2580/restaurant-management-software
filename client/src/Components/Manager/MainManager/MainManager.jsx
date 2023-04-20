import React, { useRef, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Switch } from "antd";
import style from "./MainManager.module.css";
import { logoutUser } from "../../../store/loginUser/actionCreators";
import { useDispatch, useSelector } from "react-redux";
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

export default function MainManager() {
  const time = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.loginUser.name);
  const [menuClosed, setMenuClosed] = useState();
  const [menuFolded, setMenuFolded] = useState();

  async function handleLogout() {
    const response = await fetch("http://localhost:4000/logout", {
      method: "GET",
      credentials: "include",
    });
    dispatch(logoutUser());
    navigate("/");
  }

  useEffect(() => {
    const clock = setInterval(() => {
      time.current.innerText = new Date().toLocaleTimeString(
        navigator.language,
        { hour: "2-digit", minute: "2-digit" }
      );
    }, 1000);
    return () => clearInterval(clock);
  }, []);
  const [theme, setTheme] = useState(false);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  return (
    <Layout className={!theme ? style.layout : style.layout_toggled}>
      <Sider
        className={style.sider}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log("FOLDED", broken);
          setMenuFolded(broken);
        }}
        onCollapse={(collapsed) => {
          console.log("MENUCLOSED", collapsed);
          setMenuClosed(collapsed);
        }}
      >
        <div className="logo" />
        <Menu
          className={style.menu}
          theme="light"
          mode="inline"
          //defaultSelectedKeys={["1"]}
          items={[
            getItem(
              <Link to="/manager/main/dashboard">Dashboard</Link>,
              "1",
              <DashboardOutlined className={style.icon} />
            ),
            getItem(
              <Link to="/manager/main/users">Users</Link>,
              "2",
              <UserOutlined className={style.icon} />
            ),

            getItem(
              <Link to="/manager/main/statistics">Statistics</Link>,
              "3",
              <DatabaseOutlined className={style.icon} />
            ),
            getItem(
              <Link to="/manager/main/products">Products</Link>,
              "4",
              <FileDoneOutlined className={style.icon} />
            ),
            getItem(
              <Link to="/manager/main/reservations">Reservations</Link>,
              "6",
              <TeamOutlined className={style.icon} />
            ),
            getItem(
              <Link onClick={handleLogout} to="/">
                Logout
              </Link>,
              "7",
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
      <Switch
        className={
          menuClosed || !menuFolded ? style.switch : style.switch_collapsed
        }
        onChange={handleThemeChange}
      />
    </Layout>
  );
}
