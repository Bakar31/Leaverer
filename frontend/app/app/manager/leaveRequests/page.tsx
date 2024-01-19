"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { format } from 'date-fns';

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
      {pendingLeaves.map((leave) => (
        <div key={leave.id} className="border p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">
            {leave.user.firstName} {leave.user.lastName}
          </h2>
          <p>
            <strong>Date:</strong> {format(new Date(leave.date), 'yyyy-MM-dd')}
          </p>
          <p>
            <strong>Type:</strong> {leave.type}
          </p>
          <p>
            <strong>Cause:</strong> {leave.reason}
          </p>
          <div className="mt-4">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveRequests;