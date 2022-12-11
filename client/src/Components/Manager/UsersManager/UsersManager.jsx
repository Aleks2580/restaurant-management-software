import React from "react";
import { Button } from "antd";
import style from "./UsersManager.module.css";
import { Link, Outlet } from "react-router-dom";

export default function UsersManager() {
  return (
    <>
      <div className={style.main_div}>
        <div className={style.buttons}>
          <Link to="/manager/main/users/all">
            <Button className={style.button} type="primary">
              All users
            </Button>
          </Link>
          <Link to="/manager/main/users/new">
            <Button className={style.button} type="primary">
              New user
            </Button>
          </Link>
        </div>
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
