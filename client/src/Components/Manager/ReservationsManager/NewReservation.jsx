import React, { useState } from "react";
import { TimePicker, Calendar, Input, Button, message } from "antd";
import dayjs from "dayjs";
import style from "./NewReservation.module.css";

const format = "HH:mm";

export default function NewReservation() {
  const [input, setInput] = useState({
    name: "",
    guests: "",
    phone: "",
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDate = (value) => {
    setDate(value.format("YYYY-MM-DD"));
  };

  const handleTime = (value) => {
    setTime(value.format("HH:mm"));
  };

  const submitHandler = async () => {
    const key = "updatable";
    const response = await fetch("http://localhost:4000/add_reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...input, date, time }),
      credentials: "include",
    });
    const result = await response.json();

    if (result) {
      message.loading({
        content: "Creating new reservation...",
        key,
      });
      setTimeout(() => {
        message.success({
          content: "New reservation has been created",
          key,
          duration: 2,
        });
      }, 1000);
      setInput({ name: "", guests: "", phone: "" });
      setDate("");
      setTime("");
    }
  };
  return (
    <>
      <div className={style.calendar}>
        <div className={style.when}>When?</div>
        <Calendar fullscreen={false} onSelect={handleDate} />
      </div>
      <div className={style.what_time}>What time?</div>
      <TimePicker
        className={style.time}
        //defaultValue={dayjs("12:08", format)}
        format={format}
        onSelect={handleTime}
        //value={time}
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
      <Button
        onClick={submitHandler}
        className={style.button}
        htmlType="submit"
      >
        Submit
      </Button>
    </>
  );
}
