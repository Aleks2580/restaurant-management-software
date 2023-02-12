import React from "react";
import style from "./OneTable.module.css";
import { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getTable } from "../../../store/createOrder/actionCreators";
import { useDispatch } from "react-redux";
import { tableNumber } from "../../../store/viewOrder/actionCreators";
import { DollarOutlined } from "@ant-design/icons";

export default function OneTable({ el }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOk = (e) => {
    setIsModalOpen(false);
    navigate("../create_order");
    dispatch(getTable(el.number));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createOrderHandler = () => {
    setIsModalOpen(true);
  };

  const viewOrder = () => {
    dispatch(tableNumber(el.number));
    navigate("../view_order");
  };

  return (
    <>
      {el.available ? (
        <>
          <Modal
            className={style.modal}
            title="New order"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Create a new order?</p>
          </Modal>
          <div
            onClick={createOrderHandler}
            className={style.table_first_row_green}
          >
            {el.number}
          </div>
        </>
      ) : (
        <div onClick={viewOrder} className={style.table_first_row_red}>
          {el.billPrinted ? (
            <DollarOutlined className={style.icon_dollar} />
          ) : null}{" "}
          {el.number}
        </div>
      )}
    </>
  );
}
