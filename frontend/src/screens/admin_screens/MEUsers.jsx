import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MEUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the database
  useEffect(() => {
    fetchUsers();
  }, []);
  

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/getusers'); // Replace this with your actual API endpoint to fetch users
    //   console.log(response);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Replace the endpoint with your actual API endpoint to delete the user
      await fetch(`/api/users/deleteuser/${userId}`, {
        method: 'DELETE',
      });
      // Update the list of users after deletion
      toast.success("User Deleted Successfully")
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user:', error);
    }
  };

  return (
    <div className='body-tag1 vh-100' style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='MEUsers'>
        <h1 className='MEUsers-title'>Users List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MEUsers;
