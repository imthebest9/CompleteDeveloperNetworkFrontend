import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skillsets, setSkillsets] = useState("");
  const [hobby, setHobby] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handleDeleteUser = (userId) => {
    // Logic to delete user
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

  const addUser = async () => {
    const newUser = {
      username,
      email,
      phoneNumber,
      skillsets,
      hobby,
    };
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      getUsers();
      // Clear form fields after adding user
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setSkillsets("");
      setHobby("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
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
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="bg-white rounded-lg shadow-md">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/edit-user/${user.id}`}
                  className="text-blue-500 hover:text-blue-600 mr-2"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
