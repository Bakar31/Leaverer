"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

const Profile = () => {
  const { state: authState, dispatch } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
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
        type: 'UPDATE_USER',
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
            Welcome, {authState.user.name}
          </h1>
          <hr className="mb-4" />
          <div>
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-semibold">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-500"
                    value={editedProfile?.name || ""}
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
                <p className="mb-2">Name: {authState.user.name}</p>
                <p className="mb-2">Email: {authState.user.email}</p>
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
