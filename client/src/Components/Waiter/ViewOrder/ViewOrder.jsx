import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputNumber, Button, message } from "antd";
import style from "./ViewOrder.module.css";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ViewOrder() {
  const tableNumber = useSelector((state) => state.viewOrder);
  const [order, setOrder] = useState([]);
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
      setOrder(result.order);
    })();
  }, [tableNumber]);

  return (
    <div className={style.main}>
      <section className={style.section_main}>
        <div className={style.data}>
          <div className={style.info}>
            <div className={style.info_name}>Waiter: {order.waiterName}</div>
            <div className={style.info_table}>
              Table number:{order.tableNumber}
            </div>
            <div className={style.info_guests}>
              <span>Number of guests: {order.guests}</span>
            </div>
          </div>
          <div className={style.menu}>
            {/* {sections?.map((section) => (
              <Link
                key={section.id}
                to={`/waiter/main/create_order/${section.id}`}
              >
                <div name={section.name} className={style.section}>
                  {section.name}
                </div>
              </Link>
            ))} */}
          </div>
        </div>
        {/* <div className={style.outlet}>
          <Outlet />
        </div> */}
      </section>
      <div className={style.main_order}>
        <div className={style.order}>
          ORDER:
          <div className={style.name_amount_price}>
            <div className={style.name}>Name</div>
            <div className={style.quantity}>Quantity</div>
            <div className={style.price}>Price</div>
            <div className={style.total}>Total</div>
          </div>
          {/* {order?.map((el, index) => (
            <div className={style.item}>
              <div className={style.item_name}>{el.item}</div>
              <div className={style.item_quantity}>{el.quantity}</div>
              <div className={style.item_price}>{el.price}$</div>
              <div className={style.item_total}>{el.price * el.quantity}$</div>
              <div className={style.icons}>
                <PlusOutlined
                  className={style.icon}
                  //onClick={(e) => handleAdd(e, index, el.price)}
                />
                <MinusOutlined
                  className={style.icon}
                  // onClick={(e) =>
                  //   handleSubtract(e, index, el.price, el.quantity)
                  // }
                />
                <DeleteOutlined
                  //onClick={(e) => handleDelete(e, index, el.price, el.quantity)}
                  className={style.icon}
                />
              </div>
            </div>
          ))} */}
        </div>

        <div className={style.total_sum}>TOTAL: {order.total}$</div>
      </div>
    </div>
  );
}
