"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { format } from "date-fns";

interface Leave {
  id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  date: string;
  type: string;
  reason: string;
}

const LeaveRequests = () => {
  const { state: authState, dispatch } = useAuth();
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    if (authState.user) {
      fetchPendingLeavesForManager(authState.user.id);
    }
  }, [authState.user]);

  const fetchPendingLeavesForManager = async (managerId: number | null) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaves/manager/${managerId}/pending`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      setPendingLeaves(data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const handleApproveReject = async (leaveId: string, status: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaves/${leaveId}/${status}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (authState?.user) {
        fetchPendingLeavesForManager(authState.user.id);
      }
    } catch (error) {
      console.error(`Error ${status} leave:`, error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Reason
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {pendingLeaves.map((leave) => (
            <tr key={leave.id}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {leave.user.firstName} {leave.user.lastName}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {format(new Date(leave.date), "yyyy-MM-dd")}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {leave.type}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {leave.reason}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                  onClick={() => handleApproveReject(leave.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleApproveReject(leave.id, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
