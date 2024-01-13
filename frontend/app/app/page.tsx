"use client"

import { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from "@/context/AuthContext";
import axios from 'axios';


export default function Home() {
  const { state: authState, dispatch } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState({
    content: '',
  });

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

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Hello There!</h1>
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
            onChange={(e) => setPostData({ ...postData, content: e.target.value })}
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
    </div>
  );
}