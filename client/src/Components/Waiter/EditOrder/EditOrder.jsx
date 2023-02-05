import React, { useState, useEffect } from "react";
import style from "./EditOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { InputNumber, Button, message } from "antd";

export default function EditOrder() {
  const [sections, setSections] = useState([{ name: "" }, { name: "" }]);
  const [guestsNumber, setGuestsNumber] = useState();
  const dispatch = useDispatch();
  const waiterName = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.viewOrder);

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

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/view_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableNumber }),
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      setGuestsNumber(result.order.guests);
      //setOrder(result.order);
    })();
  }, [tableNumber]);

  const onChange = (value) => {
    setGuestsNumber(value);
  };

  console.log(guestsNumber);

  return (
    <>
      <div className={style.main}>
        <section className={style.section_main}>
          <div className={style.data}>
            <div className={style.info}>
              <div className={style.info_name}>Waiter: {waiterName}</div>
              <div className={style.info_table}>Table number:{tableNumber}</div>
              <div className={style.info_guests}>
                <span>Number of guests:</span>
                <InputNumber
                  className={style.input_guests}
                  min={1}
                  max={30}
                  value={guestsNumber}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={style.menu}>
              {sections?.map((section) => (
                <Link
                  key={section.id}
                  to={`/waiter/main/edit_order/${section.id}`}
                >
                  <div name={section.name} className={style.section}>
                    {section.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className={style.outlet}>
            <Outlet />
          </div>
        </section>
        <div className={style.button_done_div}>
          <Button
            //onClick={handleDone}
            type="primary"
            className={style.button_done}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}
