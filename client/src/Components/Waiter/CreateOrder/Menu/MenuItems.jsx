import React from "react";
import { useParams } from "react-router-dom";

export default function MenuItems() {
  const { item } = useParams();
  return <div>{item}</div>;
}
