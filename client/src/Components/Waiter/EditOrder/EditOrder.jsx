import React, { useState, useEffect } from "react";
import style from "./EditOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { InputNumber, Button, message } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { placeOrder } from "../../../store/placeOrder/actionCreators";
import { addTotal } from "../../../store/total/actionCreators";
import { deleteItem, ordered } from "../../../store/placeOrder/actionCreators";
import { subtractTotal, resetTotal } from "../../../store/total/actionCreators";
import {
  addItem,
  subtractItem,
} from "../../../store/placeOrder/actionCreators";
import { resetTable } from "../../../store/createOrder/actionCreators";

export default function EditOrder() {
  const [sections, setSections] = useState([{ name: "" }, { name: "" }]);
  const [guestsNumber, setGuestsNumber] = useState(0);
  const dispatch = useDispatch();
  const orderEdit = useSelector((state) => state.placeOrder);
  const waiterName = useSelector((state) => state.loginUser.name);
  const tableNumber = useSelector((state) => state.viewOrder);
  const total = useSelector((state) => state.total);
  const navigate = useNavigate();
  const waiterId = useSelector((state) => state.loginUser.id);

  useEffect(() => {
    (async function () {
      const response = await fetch("/menu_sections", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      setSections(result.sections);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const response = await fetch("/view_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableNumber }),
        credentials: "include",
      });
      const result = await response.json();
      setGuestsNumber(result.order.guests);

      result.order.items.forEach((item) => {
        dispatch(placeOrder(item));
        dispatch(addTotal(item.price));
      });
    })();
    dispatch(ordered());
    dispatch(resetTotal());
  }, [tableNumber]);

  const onChange = (value) => {
    setGuestsNumber(value);
  };

  const handleDelete = (e, index, price, quantity) => {
    let totalSum = price * quantity;
    dispatch(deleteItem(index));
    dispatch(subtractTotal(totalSum));
  };

  const handleAdd = (e, index, price) => {
    dispatch(addItem(index));
    dispatch(addTotal(price));
  };

  const handleSubtract = (e, index, price, quantity) => {
    if (quantity === 1) {
      dispatch(deleteItem(index));
      dispatch(subtractTotal(price));
    } else {
      dispatch(subtractItem(index));
      dispatch(subtractTotal(price));
    }
  };

  const handleDone = async () => {
    const response = await fetch("/edit_order", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        waiterName,
        waiterId,
        tableNumber,
        guests: guestsNumber,
        items: orderEdit,
        total,
      }),
      credentials: "include",
    });

    const result = await response.json();
    dispatch(ordered());
    dispatch(resetTotal());
    dispatch(resetTable());
    setGuestsNumber(0);
    navigate("../layout");
    message.success({
      content: "The order has been changed",
      duration: 2,
    });
  };

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
            onClick={handleDone}
            type="primary"
            className={style.button_done}
          >
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
          {orderEdit?.map((el, index) => (
            <div className={style.item} key={el.id}>
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
                  onClick={(e) =>
                    handleSubtract(e, index, el.price, el.quantity)
                  }
                />
                <DeleteOutlined
                  onClick={(e) => handleDelete(e, index, el.price, el.quantity)}
                  className={style.icon}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={style.total_sum}>TOTAL: {total}$</div>
      </div>
    </>
  );
}
