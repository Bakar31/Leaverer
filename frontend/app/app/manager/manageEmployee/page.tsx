"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ManageEmployees = () => {
  const router = useRouter();
  const { state: authState, dispatch } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);

  const managerClickHandler = () => {
    router.push("/manager/createEmployee");
  };

  const handleEdit = (employeeId: number) => {
    console.log(`Edit employee with ID ${employeeId}`);
  };

  const handleDelete = (employeeId: number) => {
    console.log(`Delete employee with ID ${employeeId}`);
  };

  useEffect(() => {
    if (authState.user) {
      fetchEmployees(authState.user.organization);
    }
  }, [authState.user]);

  const fetchEmployees = async (organizationId: number | null) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          params: { organizationId: organizationId },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        className="bg-green-500 text-white py-2 px-4 m-2 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
        onClick={managerClickHandler}
      >
        Create Employees
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="odd:bg-gray-300 even:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {employee.email}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(employee.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;
