import React from "react";
import { useEffect, useState } from "react";
import OneUser from "./OneUser";
import style from "./AllUsers.module.css";
import { Spin, Checkbox } from "antd";

export default function AllUsers() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [role, setRole] = useState("");
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
    setCheckbox(e.target.checked);
    setRole(e.target.name);
    if (checkbox) {
      const response = await fetch("http://localhost:4000/users_filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      setFilteredUsers((prev) => result.roles);
    }
  };

  // const handleFilter = async (e) => {
  //   const response = await fetch("http://localhost:4000/users_filter", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ role }),
  //     credentials: "include",
  //   });
  //   const result = await response.json();

  //   setFilteredUsers(result.roles);
  //   console.log("STATE", filteredUsers);
  // };

  console.log(checkbox, role);

  return !loading ? (
    <div className={style.all_users}>
      <div className={style.checkboxes}>
        <Checkbox
          // onClick={handleFilter}
          onClick={handleCheckbox}
          name="manager"
        >
          manager
        </Checkbox>
        <Checkbox
          // onClick={handleFilter}
          onClick={handleCheckbox}
          name="waiter"
        >
          waiter
        </Checkbox>
      </div>
      <div className={style.users}>
        {!checkbox
          ? users?.map((el) => <OneUser el={el} key={el.id} />)
          : filteredUsers?.map((el) => <OneUser el={el} key={el.id} />)}
        {/* {users?.map((el) => (
          <OneUser el={el} key={el.id} />
        ))} */}
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
}
