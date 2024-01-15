"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import SuperAdminHome from "@/components/Home/superAdminHome";

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
          ) : (
            <>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                onClick={openModal}
              >
                Create Post
              </button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create Post Modal"
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
                {userPosts.map((post) => (
                  <div key={post.id} className="border p-4 mb-4 rounded-md">
                    <div className="flex items-center mb-2 flex">
                      <p className="text-md font-bold mr-2">
                        {post.user?.firstName} {post.user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created at:{" "}
                        {new Date(post.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-lg">{post.body}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}