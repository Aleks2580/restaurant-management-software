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
  const [totalOrders, setTotalOrders] = useState({
    totalOrdersAverageCheck: 0,
    totalOrdersTotal: 0,
    totalOrdersGuests: 0,
    tables: 0,
  });
  const [totalPaidOrders, setTotalPaidOrders] = useState({
    totalPaidOrdersAverageCheck: 0,
    totalPaidOrdersTotal: 0,
    totalPaidOrdersGuests: 0,
    tables: 0,
  });
  const [activeOrders, setActiveOrders] = useState({
    activeOrdersAverageCheck: 0,
    activeOrdersTotal: 0,
    activeOrdersGuests: 0,
    tables: 0,
  });
  const [reservations, setReservations] = useState({
    reservationsTables: 0,
    projectedRevenue: 0,
    reservationsGuests: 0,
  });

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/dashboard", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setActiveOrders({
        activeOrdersAverageCheck: result.activeOrdersAverageCheck,
        activeOrdersTotal: result.activeOrdersTotal,
        activeOrdersGuests: result.activeOrdersGuests,
        tables: result.activeOrdersTables,
      });
      setTotalOrders({
        totalOrdersAverageCheck: result.totalOrdersAverageCheck,
        totalOrdersTotal: result.totalOrdersTotal,
        totalOrdersGuests: result.totalOrdersGuests,
        tables: result.totalOrdersTables,
      });
      setTotalPaidOrders({
        totalPaidOrdersAverageCheck: result.totalPaidOrdersAverageCheck,
        totalPaidOrdersTotal: result.totalPaidOrdersTotal,
        totalPaidOrdersGuests: result.totalPaidOrdersGuests,
        tables: result.totalPaidOrdersTables,
      });
      setReservations({
        reservationsTables: result.reservationsTables,
        projectedRevenue: result.projectedRevenue,
        reservationsGuests: result.reservationsGuests,
      });
    })();
  }, []);

  return (
    <div className={style.dashboard}>
      <div className={style.info}>
        <div className={style.title}>Total Orders</div>
        <div className={style.data}>
          <div>
            tables: <span className={style.digit}>{totalOrders.tables}</span>
          </div>
          <div>
            total sum:{" "}
            <span className={style.digit}>{totalOrders.totalOrdersTotal}</span>$
          </div>
          <div>
            guests:{" "}
            <span className={style.digit}>{totalOrders.totalOrdersGuests}</span>
          </div>
          <div>
            average check:{" "}
            <span className={style.digit}>
              {totalOrders.totalOrdersAverageCheck}
            </span>
            $
          </div>
        </div>
        <CheckOutlined className={style.icon} />
      </div>

      <div className={style.info}>
        <div className={style.title}>Total Paid Orders</div>
        <div className={style.data}>
          <div>
            tables:{" "}
            <span className={style.digit}>{totalPaidOrders.tables}</span>
          </div>
          <div>
            total sum:{" "}
            <span className={style.digit}>
              {totalPaidOrders.totalPaidOrdersTotal}
            </span>
            $
          </div>
          <div>
            guests:{" "}
            <span className={style.digit}>
              {totalPaidOrders.totalPaidOrdersGuests}
            </span>
          </div>
          <div>
            average check:{" "}
            <span className={style.digit}>
              {totalPaidOrders.totalPaidOrdersAverageCheck}
            </span>
            $
          </div>
        </div>
        <DollarCircleOutlined className={style.icon} />
      </div>

      <div className={style.info}>
        <div className={style.title}>Total Active Orders</div>
        <div className={style.data}>
          <div>
            tables: <span className={style.digit}>{activeOrders.tables}</span>
          </div>
          <div>
            total sum:{" "}
            <span className={style.digit}>
              {activeOrders.activeOrdersTotal}
            </span>
            $
          </div>

          <div>
            guests:{" "}
            <span className={style.digit}>
              {activeOrders.activeOrdersGuests}
            </span>
          </div>
          <div>
            average check:{" "}
            <span className={style.digit}>
              {activeOrders.activeOrdersAverageCheck}
            </span>
            $
          </div>
        </div>
        <RiseOutlined className={style.icon} />
      </div>

      <div className={style.info}>
        <div className={style.title}>Reservations</div>
        <div className={style.data}>
          <div>
            tables:{" "}
            <span className={style.digit}>
              {reservations.reservationsTables}
            </span>
          </div>
          <div>
            guests:{" "}
            <span className={style.digit}>
              {reservations.reservationsGuests}
            </span>
          </div>
          <div>
            projected revenue:{" "}
            <span className={style.digit}>{reservations.projectedRevenue}</span>
            ${" "}
          </div>
        </div>
        <ToTopOutlined className={style.icon} />
      </div>
    </div>
  );
}
