import React, { useState, useEffect } from "react";
import { InputNumber, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateOrder.module.css";
import { Link, Outlet } from "react-router-dom";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteItem } from "../../../store/placeOrder/actionCreators";
import { subtractTotal } from "../../../store/total/actionCreators";
import {
  addItem,
  subtractItem,
} from "../../../store/placeOrder/actionCreators";
import { addTotal } from "../../../store/total/actionCreators";

export default function CreateOrder() {
  const [sections, setSections] = useState([{ name: "" }, { name: "" }]);
  const dispatch = useDispatch();
  const waiter = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.createOrder);
  const order = useSelector((state) => state.placeOrder);
  const total = useSelector((state) => state.total);

  const onChange = (value) => {};

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

  const handleDelete = (e, index, price, quantity) => {
    let totalSum = price * quantity;
    dispatch(deleteItem(index));
    dispatch(subtractTotal(totalSum));
  };

  const handleAdd = (e, index, price) => {
    dispatch(addItem(index));
    dispatch(addTotal(price));
  };

  const handleSubtract = (e, index, price) => {
    dispatch(subtractItem(index));
    dispatch(subtractTotal(price));
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.data}>
          <div className={style.info}>
            <div className={style.name}>Waiter: {waiter}</div>
            <div className={style.table}>Table number:{tableNumber}</div>
            <div>
              Number of guests:
              <InputNumber
                className={style.input_guests}
                min={1}
                max={30}
                defaultValue={2}
                onChange={onChange}
              />
            </div>
          </div>
          <div className={style.menu}>
            {sections?.map((section) => (
              <Link
                key={section.id}
                to={`/waiter/main/create_order/${section.id}`}
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
        <div className={style.button_done}>
          <Button type="primary" className={style.button_done}>
            Done
          </Button>
        </div>
      </div>
      <div className={style.main_order}>
        <div className={style.order}>
          ORDER:
          <div className={style.name_amount_price}>
            <div className={style.name}>Name</div>
            <div className={style.quantity}>Quantity</div>
            <div className={style.price}>Price</div>
            <div className={style.total}>Total</div>
          </div>
          {order?.map((el, index) => (
            <div className={style.item}>
              <div className={style.item_name}>{el.item}</div>
              <div className={style.item_quantity}>{el.quantity}</div>
              <div className={style.item_price}>{el.price}$</div>
              <div className={style.item_total}>{el.price * el.quantity}$</div>
              <div className={style.icons}>
                <PlusOutlined
                  className={style.icon}
                  onClick={(e) => handleAdd(e, index, el.price)}
                />
                <MinusOutlined
                  className={style.icon}
                  onClick={(e) => handleSubtract(e, index, el.price)}
                />
                <DeleteOutlined
                  onClick={(e) => handleDelete(e, index, el.price, el.quantity)}
                  className={style.icon}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={style.total}>TOTAL: {total}$</div>
      </div>
    </>
  );
}
