"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AskLeave = () => {
  const { state: authState, dispatch } = useAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cause, setCause] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    fetchManager();
  }, []);

  const fetchManager = async () => {
    if (authState.user) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizations/${authState.user.organization}/manager`,
          {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`,
            },
          }
        );
        setManager(response.data);
      } catch (error) {
        console.error("Error fetching manager:", error);
      }
    }
  };

  const handleDateChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleCauseChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCause(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const leaveRequestData = {
      user: authState.user,
      manager,
      startDate,
      endDate,
      cause,
    };

    //   try {
    //     const userResponse = await axios.post(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/askleave`,
    //       leaveRequestData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${authState.accessToken}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    console.log("Leave details submitted:", { leaveRequestData });
  };

  return (
    <section className="bg-base-80">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Ask for Leave
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="dates"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Dates
                </label>
                <DatePicker
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  selectsRange
                  inline
                  open={calendarOpen}
                />
              </div>
              <div>
                <label
                  htmlFor="cause"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Leave Cause
                </label>
                <select
                  id="cause"
                  name="cause"
                  value={cause}
                  onChange={handleCauseChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Select a cause
                  </option>
                  <option value="PTO">PTO</option>
                  <option value="SickLeave">Sick Leave</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskLeave;
