"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Organizations = () => {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizations`
      );
      const data = await response.data;
      setOrgs(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-extrabold">All organizations</h1>
      <ul>
        {orgs.map((org) => (
          <li key={org.id}>
            <p>Name: {org.name}</p>
            <p>Email: {org.address}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;
