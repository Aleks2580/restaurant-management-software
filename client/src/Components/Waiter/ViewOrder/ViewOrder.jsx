import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ViewOrder() {
  const tableNumber = useSelector((state) => state.viewOrder);
  const [order, setOrder] = useState();
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/view_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableNumber }),
        credentials: "include",
      });
      const result = await response.json();
      //setTables(result.tables.sort((a, b) => a.number - b.number));
    })();
  }, []);

  return <div>ViewOrder</div>;
}
