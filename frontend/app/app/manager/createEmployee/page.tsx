"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export enum EUserRole {
  EMPLOYEE = "employee",
}

const CreateOrganization = () => {
  const router = useRouter();
  const { state: authState, dispatch } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee",
    organization: authState.user?.organization,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const userResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Register Employee
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleRegistration}
          >
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter first name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter last name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter password"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={userData.role}
                onChange={handleChange}
              >
                <option value={EUserRole.EMPLOYEE}>Employee</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full text-black bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
            >
              Register Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;
