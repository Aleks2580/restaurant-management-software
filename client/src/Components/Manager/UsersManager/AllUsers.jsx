import React from "react";
import { useEffect, useState } from "react";
import OneUser from "./OneUser";
import style from "./AllUsers.module.css";
import { Spin } from "antd";

export default function AllUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/users", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setUsers(result.users);
      setLoading(false);
    })();
  }, []);

  return !loading ? (
    <div className={style.users}>
      {users?.map((el) => (
        <OneUser el={el} key={el.id} />
      ))}
    </div>
  ) : (
    <Spin size="large" />
  );
}
