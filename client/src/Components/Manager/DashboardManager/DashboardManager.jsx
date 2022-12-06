import React from "react";
import style from "./DashboardManager.module.css";
import {
  CheckOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  ToTopOutlined,
} from "@ant-design/icons";

export default function DashboardManager() {
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
