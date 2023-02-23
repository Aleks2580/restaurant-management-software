import React from "react";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./OneProduct.module.css";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function OneProduct({ el }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {display ? (
        <div className={style.card}>
          <>
            <div className={style.info}>
              <div className={style.name}>{el.name}</div>
              <div className={style.role}>{el.priceUSD}$</div>
            </div>
            <div className={style.icons}>
              {/* <DeleteOutlined onClick={deleteHandler} className={style.icon} /> */}

              {/* <EditOutlined onClick={editHandler} className={style.icon} /> */}
            </div>
          </>
        </div>
      ) : null}
    </>
  );
}
