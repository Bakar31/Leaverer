"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import SuperAdminHome from "@/components/Home/superAdminHome";
import ManagerHome from "@/components/Home/managerHome";
import EmployeeHome from "@/components/Home/employeeHome";

export default function Home() {
  const { state: authState, dispatch } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState({
    content: "",
  });
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (authState.user) {
      getPostsForUser(authState.user);
    }
  }, [authState.user]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = async () => {
    const user = authState.user;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
        {
          user,
          body: postData.content,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPostsForUser = async (user: {
    id: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    organization?: number | null;
  }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
        {
          params: user,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUserPosts(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {authState.user && (
        <div className="container mx-auto my-8 gap-2">
          {authState.user.role === "superAdmin" ? (
            <SuperAdminHome />
          ) : authState.user.role === "manager" ? (
            <>
              <ManagerHome />
            </>
          ) : (
            <EmployeeHome />
          )}
        </div>
      )}
    </>
  );
}
