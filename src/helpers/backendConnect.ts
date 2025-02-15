"use client"

import { Attendance } from "@/types/guard";
import { Registration } from "@/types/register";
import axios from "axios";

export async function registerGuard({ data }: { data: Registration }) {
  try {
    console.log("in backend connect " ,data);
    const response = await axios.post("/api/guard/register", {
        ...data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function markAttendance(data : Attendance) {
  try {
    const response = await axios.post("/api/guard/attendance", data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
