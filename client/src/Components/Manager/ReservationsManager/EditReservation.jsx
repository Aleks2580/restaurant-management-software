import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doneEditing } from "../../../store/editReservation/actionCreators";
import { Input, Button, message } from "antd";
import style from "./EditReservation.module.css";

export default function EditReservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { date, time, name, guests, phone, id } = useSelector(
    (state) => state.editReservation
  );

  const [input, setInput] = useState({
    date: date,
    time: time,
    name: name,
    guests: guests,
    phone: phone,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChange = async (e) => {
    const response = await fetch("http://localhost:4000/edit_reservation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: input.date,
        time: input.time,
        name: input.name,
        guests: input.guests,
        phone: input.phone,
        id: id,
      }),
      credentials: "include",
    });
    const result = await response.json();
    if (result) {
      messageApi.open({
        type: "success",
        content: "The reservation has been changed",
      });
      dispatch(doneEditing());
      setTimeout(() => {
        navigate("../upcoming");
      }, 1000);
    }
  };
  return (
    <>
      {contextHolder}
      <div className={style.calendar}>
        <div className={style.when}>When?</div>
        <Input
          onChange={inputHandler}
          name="date"
          value={input.date}
          className={style.input}
        />
      </div>
      <div className={style.what_time}>What time?</div>

      <Input
        onChange={inputHandler}
        name="time"
        value={input.time}
        className={style.input}
      />
      <div className={style.who}>Who?</div>
      <Input
        onChange={inputHandler}
        name="name"
        placeholder="full name"
        value={input.name}
        className={style.input}
      />
      <div className={style.how_many}>How many people?</div>
      <Input
        onChange={inputHandler}
        name="guests"
        placeholder="number of guests"
        value={input.guests}
        className={style.input}
      />
      <div className={style.phone}>Phone number</div>
      <Input
        onChange={inputHandler}
        name="phone"
        placeholder="phone number"
        value={input.phone}
        className={style.input}
      />
      <Button onClick={handleChange} className={style.button} htmlType="submit">
        Change
      </Button>
    </>
  );
}
