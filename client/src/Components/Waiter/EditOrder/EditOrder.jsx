import React, { useState, useEffect } from "react";
import style from "./EditOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function EditOrder() {
  const [sections, setSections] = useState([{ name: "" }, { name: "" }]);
  const [guestsNumber, setGuestsNumber] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/menu_sections", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      setSections(result.sections);
    })();
  }, []);
  return (
    <div className={style.menu}>
      {sections?.map((section) => (
        <Link key={section.id} to={`/waiter/main/create_order/${section.id}`}>
          <div name={section.name} className={style.section}>
            {section.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
