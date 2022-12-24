import React from "react";
import { TimePicker, Calendar, Input, Button } from "antd";
import dayjs from "dayjs";
import style from "./NewReservation.module.css";

const format = "HH:mm";

export default function NewReservation() {
  const handleDate = (value) => {
    console.log(typeof value.format("YYYY-MM-DD"));
  };

  const handleTime = (value) => {
    console.log(typeof value.format("HH:mm"));
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
      />
      <div className={style.who}>Who?</div>
      <Input
        //onChange={inputHandler}
        name="fullName"
        placeholder="full name"
        //value={input.fullName}
        className={style.input}
      />
      <div className={style.how_many}>How many people?</div>
      <Input
        //onChange={inputHandler}
        name="fullName"
        placeholder="number of guests"
        //value={input.fullName}
        className={style.input}
      />
      <Button
        //onClick={submitHandler}
        className={style.button}
        htmlType="submit"
      >
        Submit
      </Button>
    </>
  );
}