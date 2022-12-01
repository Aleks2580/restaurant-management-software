import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./WrongPassword.module.css";

export default function WrongPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <div className={style.wrong}>
      Your password is incorrect. <br /> Please, try again!
    </div>
  );
}
