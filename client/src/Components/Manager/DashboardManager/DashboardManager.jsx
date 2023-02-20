import React from "react";
import style from "./DashboardManager.module.css";
import { useState, useEffect } from "react";
import {
  CheckOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  ToTopOutlined,
} from "@ant-design/icons";

export default function DashboardManager() {
  //const [totalOrders, setTotalOrders] = useState();
  //const [totalPaidOrders, setTotalPaidOrders] = useState();
  const [activeOrders, setActiveOrders] = useState({
    activeOrdersAverageCheck: 0,
    activeOrdersTotal: 0,
    activeOrdersGuests: 0,
  });
  //const [reservations, setReservations] = useState();

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/dashboard", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log("RESULT", result.activeOrdersAverageCheck);

      //setReservations(result.data);
      //setLoading(false);
      //const noDuplicateDates = [...new Set(result.data.map((el) => el.date))];
      //setDates(noDuplicateDates);
    })();
  }, []);

  return (
    <div className={style.dashboard}>
      <div className={style.info}>
        <div className={style.title}>Total Orders</div>
        <div className={style.data}>
          <div>
            total sum: <span className={style.digit}>0</span>$
          </div>
          <div>
            guests: <span className={style.digit}>0</span>
          </div>
          <div>
            average check: <span className={style.digit}>0</span>$
          </div>
        </div>
        <CheckOutlined className={style.icon} />
      </div>

      <div className={style.info}>
        <div className={style.title}>Total Paid Orders</div>
        <div className={style.data}>
          <div>
            total sum: <span className={style.digit}>0</span>$
          </div>
          <div>
            guests: <span className={style.digit}>0</span>
          </div>
          <div>
            average check: <span className={style.digit}>0</span>$
          </div>
        </div>
        <DollarCircleOutlined className={style.icon} />
      </div>

      <div className={style.info}>
        <div className={style.title}>Total Active Orders</div>
        <div className={style.data}>
          <div>
            total sum: <span className={style.digit}>0</span>$
          </div>
          <div>
            guests: <span className={style.digit}>0</span>
          </div>
          <div>
            average check: <span className={style.digit}>0</span>$
          </div>
        </div>
        <RiseOutlined className={style.icon} />
      </div>

      <div className={style.info}>
        <div className={style.title}>Reservations</div>
        <div className={style.data}>
          <div>
            tables: <span className={style.digit}>0</span>
          </div>
          <div>
            guests: <span className={style.digit}>0</span>
          </div>
          <div>
            projected revenue: <span className={style.digit}>0</span>${" "}
          </div>
        </div>
        <ToTopOutlined className={style.icon} />
      </div>
    </div>
  );
}
