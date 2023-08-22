import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handleDeleteUser = async (id) => {
    // Logic to delete user
    try {
      await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      alert("User deleted successfully!");
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUsers = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        User Management
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <Link
          to="/add-user"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
        >
          Add User
        </Link>
        <input
          type="text"
          className="border rounded p-2 w-40"
          placeholder="Search username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-4">Username</th>
              <th className="px-4 py-2 border-4">Email</th>
              <th className="px-4 py-2 border-4">Phone Number</th>
              <th className="px-4 py-2 border-4">Skillsets</th>
              <th className="px-4 py-2 border-4">Hobby</th>
              <th className="px-4 py-2 border-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="bg-white rounded-lg shadow-md">
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phoneNumber}</td>
                <td className="px-4 py-2 border">{user.skillsets}</td>
                <td className="px-4 py-2 border">{user.hobby}</td>
                <td className="px-4 py-2 border flex justify-center">
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-user/${user.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition duration-300 ease-in-out"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition duration-300 ease-in-out"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({
          length: Math.ceil(filteredUsers.length / usersPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
