"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Organizations = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
      );
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-extrabold">All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.fastName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;
