import React from "react";
import { useEffect, useState } from "react";
import OneUser from "./OneUser";
import style from "./AllUsers.module.css";
import { Spin } from "antd";

export default function AllUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();

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

  const handleRadioButton = async (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
    const response = await fetch("http://localhost:4000/users_filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: { ...role, [e.target.name]: e.target.value },
      }),
      credentials: "include",
    });
    const result = await response.json();
    setUsers(result.roles);
  };

  return !loading ? (
    <div className={style.all_users}>
      <div className={style.checkboxes}>
        <div>
          <input
            id="all"
            type="radio"
            onChange={handleRadioButton}
            value="all"
            name="all"
          />
          <label for="all">all</label>
          <input
            id="manager"
            type="radio"
            onChange={handleRadioButton}
            value="manager"
            name="all"
          />
          <label for="manager">manager</label>
          <input
            id="waiter"
            type="radio"
            onChange={handleRadioButton}
            value="waiter"
            name="all"
          />
          <label for="waiter">waiter</label>
        </div>
      </div>
      <div className={style.users}>
        {users?.map((el) => (
          <OneUser el={el} key={el.id} />
        ))}
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
}
