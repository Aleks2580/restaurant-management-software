import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./ViewOrder.module.css";
import { Button, Modal, message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { digits } from "../../Manager/LoginManager/mockdata";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function ViewOrder() {
  const tableNumber = useSelector((state) => state.viewOrder);
  const [isModalCancelBillOpen, setIsModalCancelBillOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [cancelled, setCancelled] = useState(false);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setPassword((prev) => prev + e.target.innerText);
  };

  const resetHandler = () => {
    setPassword("");
  };

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
  }, [tableNumber, cancelled]);

  const handleEdit = () => {
    navigate("../edit_order");
  };

  const handleBill = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const response = await fetch("http://localhost:4000/print_bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableNumber, billPrinted: true }),
      credentials: "include",
    });
    const result = await response.json();
    message.success({
      content: "The bill has been printed",
      duration: 2,
    });
    navigate("../layout");
  };

  const handlePay = async () => {
    const response = await fetch("http://localhost:4000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableNumber,
        open: false,
        available: true,
        billPrinted: false,
      }),
      credentials: "include",
    });
    const result = await response.json();
    message.success({
      content: "The bill has been paid",
      duration: 2,
    });
    navigate("../layout");
  };

  const handleCancelBill = () => {
    setIsModalCancelBillOpen(true);
  };

  const handleOkCancelBill = async () => {
    const response = await fetch("http://localhost:4000/cancel_print_bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableNumber, billPrinted: false, password }),
      credentials: "include",
    });
    const result = await response.json();
    if (result === "Password is incorrect") {
      setPassword("");
      setCheckPassword(true);
      setTimeout(() => {
        setCheckPassword(false);
      }, 2000);
    } else {
      message.success({
        content: "The bill has been cancelled",
        duration: 2,
      });
      setPassword("");
      navigate("../view_order");
      setCancelled(true);
      setIsModalCancelBillOpen(false);
    }
  };

  const handleCancelCancelBill = () => {
    setIsModalCancelBillOpen(false);
    setPassword("");
  };

  return (
    <>
      <Modal
        className={style.modal}
        title="Bill"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Print a bill?</p>
      </Modal>
      <Modal
        className={style.modal}
        open={isModalCancelBillOpen}
        onOk={handleOkCancelBill}
        onCancel={handleCancelCancelBill}
      >
        <Form
          className={style.form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <span className={style.span}>Manager's password is required</span>
          <div className={style.digits}>
            {digits.map((el) => (
              <Button
                onClick={inputHandler}
                className={style.button_manager}
                type="primary"
                shape="circle"
                key={el}
              >
                {el}
              </Button>
            ))}
          </div>
          <div>
            <input
              className={style.input_manager}
              name="password"
              value={password
                .split("")
                .map((el) => (el = "*"))
                .join("")}
              onChange={inputHandler}
            />
          </div>

          {checkPassword ? (
            <div className={style.incorrect}>
              <CloseCircleOutlined className={style.icon_circle} />
              Incorrect password
            </div>
          ) : (
            ""
          )}

          <Form.Item>
            <div className={style.form_buttons}>
              <Button
                onClick={resetHandler}
                className={style.button_reset}
                type="primary"
              >
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <div className={style.main}>
        <section className={style.section_main}>
          <div className={style.data}>
            <div className={style.info}>
              <div className={style.info_name}>Waiter: {order?.waiterName}</div>
              <div className={style.info_table}>
                Table number:{order?.tableNumber}
              </div>
              <div className={style.info_guests}>
                <span>Number of guests: {order?.guests}</span>
              </div>
            </div>
          </div>
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
            {order?.items?.map((item) => (
              <div className={style.item} key={item.id}>
                <div className={style.item_name}>{item.item}</div>
                <div className={style.item_quantity}>{item.quantity}</div>
                <div className={style.item_price}>{item.price}$</div>
                <div className={style.item_total}>
                  {item.price * item.quantity}$
                </div>
              </div>
            ))}
          </div>

          <div className={style.total_sum}>
            <div>
              {!order?.billPrinted ? (
                <Button
                  onClick={handleEdit}
                  type="primary"
                  className={style.button_edit}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleCancelBill}
                  type="primary"
                  className={style.button_cancel}
                >
                  Cancel bill
                </Button>
              )}
            </div>
            {!order?.billPrinted ? (
              <div>
                <Button
                  onClick={handleBill}
                  type="primary"
                  className={style.button_bill}
                >
                  Bill
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={handlePay}
                  type="primary"
                  className={style.button_bill}
                >
                  Pay
                </Button>
              </div>
            )}

            <div>TOTAL: {order?.total}$</div>
          </div>
        </div>
      </div>
    </>
  );
}
