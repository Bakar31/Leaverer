"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Avatar from "react-avatar";
import { formatDistanceToNow } from "date-fns";

const EmployeeHome = () => {
  const router = useRouter();
  const { state: authState, dispatch } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState({
    content: "",
  });
  const [userPosts, setUserPosts] = useState([]);
  const [absentEmployeesNames, setAbsentEmployeesNames] = useState<string>("");

  const askLeaveClickHandler = () => {
    router.push("/employee/askLeave");
  };

  useEffect(() => {
    Modal.setAppElement("main");
    if (authState.user) {
      getPostsForUser(authState.user);
    }
  }, [authState.user]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPostData({ content: "" });
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

      if (response.status === 201) {
        closeModal();
        getPostsForUser(authState.user);
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

  useEffect(() => {
    if (authState.user) {
      fetchAbsentEmployees(authState.user.organization);
    }
  }, [authState.user]);

  const fetchAbsentEmployees = async (organizationId: number | null) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaves/${organizationId}/absent-today`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      const names = data
        .map((employee: { employeeName: any }) => `${employee.employeeName}`)
        .join(", ");
      setAbsentEmployeesNames(names);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  return (
    <div>
      {absentEmployeesNames && (
        <div className="bg-red-200 p-4 text-red-800 mb-4">
          Absent Employees: {absentEmployeesNames}
        </div>
      )}
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={openModal}
        >
          Create Post
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={askLeaveClickHandler}
        >
          Ask Leave
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(169, 169, 169, 0.75)",
          },
          content: {
            width: "40%",
            margin: "auto",
            maxHeight: "40%",
            overflow: "auto",
          },
        }}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Create Post</h2>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={postData.content}
            onChange={(e) =>
              setPostData({ ...postData, content: e.target.value })
            }
            placeholder="Enter your post content"
          />
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green mr-2"
              onClick={handlePostSubmit}
            >
              Submit Post
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <div>
        {userPosts
          .slice()
          .reverse()
          .map((post) => (
            <div key={post.id} className="border p-4 mb-4 rounded-md flex">
              <div className="flex-shrink-0 mr-4">
                <Avatar
                  name={`${post.user?.firstName} ${post.user?.lastName}`}
                  size="35"
                  round
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <p className="text-md font-bold mr-2">
                    {post.user?.firstName} {post.user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Posted{" "}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="text-lg">{post.body}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmployeeHome;
