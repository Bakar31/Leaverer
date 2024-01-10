"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const RegisterOrganization = () => {
  const router = useRouter();
  const { state: authState, dispatch } = useAuth();
  const [orgData, setOrgData] = useState({
    name: "",
    address: "",
    logo: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrgData({
      ...orgData,
      [name]: value,
    });
  };

  const handleOrgRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizations`,
        orgData,
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      router.push("superadmin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-base-80">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register Organization
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleOrgRegistration}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter organization name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter address"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="logo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logo"
                  id="logo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter logo URL"
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-black bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
              >
                Register Organization
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterOrganization;
