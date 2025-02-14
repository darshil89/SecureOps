"use client";
import { fetchData } from "next-auth/client/_utils";
import React, { useState } from "react";
import { useEffect } from "react";

const page = () => {
  const [guardData, setGuardData] = useState([]);
  const fetchGuardData = async () => {
    const response = await fetch("/api/agency", {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    });
    const resData = await response.json();

    setGuardData(resData);
  };
  useEffect(() => {
    fetchGuardData();
  }, []);

  return <div>{JSON.stringify(guardData)}</div>;
};

export default page;
