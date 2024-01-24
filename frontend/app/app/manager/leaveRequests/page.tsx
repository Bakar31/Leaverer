"use client"

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
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Reason</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingLeaves.map((leave) => (
            <tr key={leave.id}>
              <td className="border border-gray-300 p-2">
                {leave.user.firstName} {leave.user.lastName}
              </td>
              <td className="border border-gray-300 p-2">
                {format(new Date(leave.date), "yyyy-MM-dd")}
              </td>
              <td className="border border-gray-300 p-2">{leave.type}</td>
              <td className="border border-gray-300 p-2">{leave.reason}</td>
              <td className="border border-gray-300 p-2 text-center">
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
