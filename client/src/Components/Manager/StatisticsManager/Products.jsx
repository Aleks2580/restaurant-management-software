import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function Products() {
  const [topMenuSections, setTopMenuSections] = useState([]);
  const [topMenuCategories, setTopMenuCategories] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      const response = await fetch(
        `http://localhost:4000/statistics_products`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      //setWaiters(result.waiters);
    })();
  }, []);
  return <>Hello</>;
}
