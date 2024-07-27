"use client"; // This directive makes the component a Client Component

import React, { useState, useEffect } from 'react';

// definition of shape of user objects
interface User {
    id: number;
    name: string;
    email: string; // Corrected typo: changed 'emai' to 'email'
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // returns a promise so we need to use 'await'. While using await, component needs to be async
            // res = response
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                cache: 'no-store'
                // revalidate every X s
                // next: { revalidate: 10 }
            });
            // awaiting response to get the data + annotation of its type (User [])
            const data: User[] = await res.json();
            setUsers(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <p>{new Date().toLocaleTimeString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td> {/* Corrected from <th> to <td> and added {} */}
                            <td>{user.email}</td> {/* Corrected from <th> to <td> and added {} */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
