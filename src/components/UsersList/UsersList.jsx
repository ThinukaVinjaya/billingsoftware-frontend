import React, { useState } from 'react';
import { deleteUser } from '../../Service/UserService';
import toast from 'react-hot-toast';

const UsersList = ({ users, setUsers }) => {   // ✅ fixed prop name

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByUserId = async (id) => {
    try {
      await deleteUser(id);

      // ✅ update users list after delete
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));

      toast.success("User deleted");
    } catch (e) {
      console.error(e);
      toast.error("Unable to delete user");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'auto' }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-12">
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">  {/* ✅ fixed className */}
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <p className="mb-0 text-white">{user.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteByUserId(user.userId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
