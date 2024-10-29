import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import BackButton from './BackButton';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    // Fetch data 
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Handle search 
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setFilteredUsers(users); 
    } else {
      const filtered = users.filter((user) => 
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // Handle user add 
  const handleUserSubmit = (newUser) => {
    if (editUser) {
      // Edit user 
      const updatedUsers = users.map((user) =>
        user.id === editUser.id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } else {
      // Add user 
      const newUserWithId = { ...newUser, id: users.length + 1 };
      const updatedUsers = [...users, newUserWithId];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
    setEditUser(null); 
  };

  //  user delete
  const handleDelete = (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  };

  // Open modal  
  const handleEdit = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <BackButton />

    <div className="py-7">
    <h1 className="text-2xl font-bold mr-10 text-center">User Data</h1>

      <div className="  mb-2 flex justify-self-center items-center">
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white my-2 px-4 py-2 rounded-md mr-10"
        >
          Add User
        </button>
        
      </div>
      <div className='flex justify-center'>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        className="border p-2 rounded mb-4 w-1/2 outline-none"
      />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border  px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Company</th>
            <th className="border px-4 py-2">Website</th> 
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.company.name}</td>
              <td className="border px-4 py-2">{user.website}</td> 
              <td className="border px-4 py-2 flex justify-between cursor-pointer">
               
                <svg
                 onClick={() => handleEdit(user)}
                 className='cursor-pointer'

                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/></svg>
                
                <svg
                  onClick={() => handleDelete(user.id)}
                  className='cursor-pointer'
                
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditUser(null); 
          }}
          onSubmit={handleUserSubmit}
          user={editUser}
        />
      )}
    </div>
    </>
  );
};

export default UserData;
