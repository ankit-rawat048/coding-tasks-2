import React, { useState, useEffect } from 'react';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [editId, setEditId] = useState(null);

    // ✅ Fetch All Users
    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err));
    }, []);

    // ✅ Add New User
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            // Update user
            const response = await fetch(`http://localhost:3001/users/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, age })
            });

            const updatedUser = await response.json();
            setUsers(users.map(user => user._id === editId ? updatedUser : user));
            setEditId(null);
        } else {
            // Create new user
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, age })
            });

            const newUser = await response.json();
            setUsers([...users, newUser]);
        }

        setName('');
        setEmail('');
        setAge('');
    };

    // ✅ Delete User
    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE'
        });

        setUsers(users.filter(user => user._id !== id));
    };

    // ✅ Handle Edit
    const handleEdit = (user) => {
        setEditId(user._id);
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
    };

    return (
        <div>
            <h1>User Management System</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">
                    {editId ? 'Update User' : 'Add User'}
                </button>
            </form>

            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - {user.email} - {user.age}  
                        <button onClick={() => handleEdit(user)}> Edit</button>
                        <button onClick={() => handleDelete(user._id)}> Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
