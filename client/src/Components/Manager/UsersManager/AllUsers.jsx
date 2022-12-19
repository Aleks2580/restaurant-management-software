import React from "react";
import { useEffect, useState } from "react";
import OneUser from "./OneUser";
import style from "./AllUsers.module.css";
import { Spin } from "antd";

export default function AllUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

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

  const handleCheckbox = async (e) => {
    setRole(e.target.value);
    const response = await fetch("http://localhost:4000/users_filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
      credentials: "include",
    });
    const result = await response.json();
    setUsers(result.roles);
  };

  console.log(role);

  return !loading ? (
    <div className={style.all_users}>
      <div className={style.checkboxes}>
        <div>
          <input
            id="all"
            type="radio"
            onChange={handleCheckbox}
            value="all"
            name="all"
          />
          <label for="all">all</label>
          <input
            id="manager"
            type="radio"
            onChange={handleCheckbox}
            value="manager"
            name="all"
          />
          <label for="manager">manager</label>
          <input
            id="waiter"
            type="radio"
            onChange={handleCheckbox}
            value="waiter"
            name="all"
          />
          <label for="waiter">waiter</label>
        </div>
      </div>
      <div className={style.users}>
        {/* {!role
          ? users?.map((el) => <OneUser el={el} key={el.id} />)
          : filteredUsers?.map((el) => <OneUser el={el} key={el.id} />)} */}
        {users?.map((el) => (
          <OneUser el={el} key={el.id} />
        ))}
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
}
