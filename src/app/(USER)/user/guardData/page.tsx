"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch("/api/user/guardData", {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    });

    const resData = await response.json();
    setData(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>{JSON.stringify(data)}</div>;
};

export default page;
