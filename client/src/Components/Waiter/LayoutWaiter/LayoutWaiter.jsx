import React from "react";
import style from "./LayoutWaiter.module.css";

export default function LayoutWaiter() {
  return (
    <>
      <div className={style.first_row}>
        <div className={style.table_first_row}>101</div>
        <div className={style.table_first_row}>102</div>
        <div className={style.table_first_row}>103</div>
        <div className={style.table_first_row}>104</div>
        <div className={style.table_first_row}>105</div>
      </div>
      <div className={style.second_row}>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
      </div>
      <div className={style.third_row}>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
      </div>
    </>
  );
}
