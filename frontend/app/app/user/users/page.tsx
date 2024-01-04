"use client"

import React, { useEffect, useState } from "react";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div>
            <h1 className="text-center font-extrabold">User Information</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
