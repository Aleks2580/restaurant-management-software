import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WrongPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <div>
      Your password is incorrect. <br /> Please, try again!
    </div>
  );
}
