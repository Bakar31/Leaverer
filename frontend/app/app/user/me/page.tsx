"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Organization {
  name: string;
  address: string;
}

const Profile = () => {
  const { state: authState, dispatch } = useAuth();
  const [org, setOrg] = useState<Organization>({
    name: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  const managerClickHandler = () => {
    router.push("/manager/createEmployee");
  };

  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setEditedProfile(null);
    setIsEditing(false);
    router.push("/user/sign-in");
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push("/user/sign-in");
      return;
    }
    setEditedProfile(authState.user);
  }, [authState.isAuthenticated, authState.user, router]);

  useEffect(() => {
    const getOrg = async () => {
      try {
        if (authState.user?.role === "superAdmin") {
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizations/${authState.user?.organization}`
        );

        if (response.status === 200) {
          const data = await response.data;
          setOrg(data)
        } else {
          console.error("Failed to fetch Org");
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    getOrg();
  }, [authState.user]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveButtonClick = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${editedProfile?.id}`,
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          },
        }
      );

      dispatch({
        type: "UPDATE_USER",
        user: response.data,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      {authState.user ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Welcome,{authState.user.firstName} {authState.user.lastName}
          </h1>

          {authState.user.role === "manager" ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={managerClickHandler}
            >
              Create Employee
            </button>
          ) : (
            <></>
          )}
          <hr className="mb-4" />
          <div>
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block mb-1 font-semibold"
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-500"
                    value={editedProfile?.firstName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block mb-1 font-semibold"
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-500"
                    value={editedProfile?.lastName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 font-semibold">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-500"
                    value={editedProfile?.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="px-6 py-2 mr-4 text-black bg-blue-300 rounded-md focus:outline-none hover:bg-primary-600"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </button>
                  <button
                    className="px-6 py-2 text-black bg-gray-400 rounded-md focus:outline-none hover:bg-gray-600"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Profile info:</h2>
                <p className="mb-2">UserId: {authState.user.id}</p>
                <p className="mb-2">First Name: {authState.user.firstName}</p>
                <p className="mb-2">Last Name: {authState.user.lastName}</p>
                <p className="mb-2">Email: {authState.user.email}</p>
                <p className="mb-2">Role: {authState.user.role}</p>

                {authState.user.role !== "superAdmin" && (
                  <div>
                    <h2 className="font-semibold">Organization info:</h2>
                    <p className="mb-2">Organization Name: {org.name}</p>
                    <p className="mb-2">Organization Address: {org.address}</p>
                  </div>
                )}
                <button
                  className="px-6 py-2 mt-4 text-black bg-green-300 rounded-md focus:outline-none hover:bg-primary-600"
                  onClick={handleEditButtonClick}
                >
                  Edit Profile
                </button>
                <button
                  className="px-6 py-2 mb-4 text-black bg-red-300 rounded-md focus:outline-none hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
