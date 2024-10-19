import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../redux/userSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5009/api/users/${id}`); 
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: currentUser.username,
      email: currentUser.email,
    };

    await axios.put(`http://localhost:5009/api/users/${currentUser._id}`, updatedUser);
    dispatch(updateUser({ ...currentUser, ...updatedUser })); 
    setIsEditing(false); 
    setCurrentUser({}); 
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            type="text"
            value={currentUser.username}
            onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
            required
            className="border p-2 mr-2"
            placeholder="Username"
          />
          <input
            type="email"
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            required
            className="border p-2 mr-2"
            placeholder="Email"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Update</button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2">Cancel</button>
        </form>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Username</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-1 mr-1">Edit</button>
                  <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white p-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/register">
        <button className="mt-4 bg-green-500 text-white p-2 rounded-md">Register Here</button>
      </Link>
    </div>
  );
};

export default Home;
