import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doneEditing } from "../../../store/editReservation/actionCreators";
import { TimePicker, Calendar, Input, Button, message } from "antd";
import style from "./EditReservation.module.css";
import dayjs from "dayjs";

const format = "HH:mm";

export default function EditReservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { date, time, name, guests } = useSelector(
    (state) => state.editReservation
  );

  console.log("TIME", typeof time);

  const [input, setInput] = useState({
    name: name,
    guests: guests,
  });
  const [dateToEdit, setDateToEdit] = useState(date);
  const [timeToEdit, settimeToEdit] = useState(time);

  const handleDate = () => {};
  const handleChange = async () => {};
  return (
    <>
      <div className={style.calendar}>
        <div className={style.when}>When?</div>
        {/* <Calendar
          //defaultValue={date}
          fullscreen={false}
          onSelect={handleDate}
        /> */}
        <Input
          //onChange={inputHandler}
          name="date"
          //placeholder="full name"
          value={dateToEdit}
          className={style.input}
        />
      </div>
      <div className={style.what_time}>What time?</div>
      {/* <TimePicker
        className={style.time}
        //defaultValue={dayjs({ time }, format)}
        //format={format}
        //onSelect={handleTime}
        //value={timeToEdit}
      /> */}
      <Input
        //onChange={inputHandler}
        name="time"
        //placeholder="full name"
        value={timeToEdit}
        className={style.input}
      />
      <div className={style.who}>Who?</div>
      <Input
        //onChange={inputHandler}
        name="name"
        placeholder="full name"
        value={input.name}
        className={style.input}
      />
      <div className={style.how_many}>How many people?</div>
      <Input
        //onChange={inputHandler}
        name="guests"
        placeholder="number of guests"
        value={input.guests}
        className={style.input}
      />
      <Button onClick={handleChange} className={style.button} htmlType="submit">
        Change
      </Button>
    </>
  );
}
