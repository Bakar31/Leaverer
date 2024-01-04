"use client";

import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserPageProps {
    params: {
      id: number;
    };
}

const UserPage: FC<UserPageProps> = ({
    params: { id },
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        
        fetchUser(id);

    }, [id]);

    const fetchUser = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <div>
            <h1 className="text-center font-extrabold">User Information</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserPage;
