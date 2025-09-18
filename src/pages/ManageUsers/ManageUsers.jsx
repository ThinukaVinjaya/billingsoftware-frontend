import React, { useEffect, useState } from 'react';
import './ManageUsers.css';
import UserForm from '../../components/UserForm/UserForm';
import UsersList from '../../components/UsersList/UsersList';
import toast from 'react-hot-toast';
import { fetchUsers } from '../../Service/UserService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UsersList users={users} setUsers={setUsers} />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
