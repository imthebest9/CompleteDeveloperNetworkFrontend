import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditUserForm = () => {
  const { userId } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skillsets, setSkillsets] = useState("");
  const [hobby, setHobby] = useState("");

  const handleEditUser = async () => {
    // Logic to edit user
    const editedUser = {
      Id: userId,
      Username: username,
      Email: email,
      PhoneNumber: phoneNumber,
      Skillsets: skillsets,
      Hobby: hobby,
    };
    try {
      await fetch("/api/user/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });
      // Clear form fields after adding user
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setSkillsets("");
      setHobby("");

      // Redirect to home page after adding user
      alert("User updated successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      // Fetch user data using the userId from the route params
      // Update the state with the fetched user data
      try {
        const response = await fetch("/api/user/" + userId);
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setSkillsets(data.skillsets);
        setHobby(data.hobby);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit User</h1>
      <form className="max-w-lg mx-auto" onSubmit={handleEditUser}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="p-2 border rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="p-2 border rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* if email is not in correct format, display warning div */}
          {!email.includes("@") && email.length !== 0 ? (
            <div className="text-red-500 text-xs mt-1">
              Email must be in correct format. (example@gmail.com)
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="p-2 border rounded w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* if phone number is not between 10 and 11 characters, display a warning div */}
          {(phoneNumber.length < 10 || phoneNumber.length > 11) &&
          phoneNumber.length !== 0 ? (
            <div className="text-red-500 text-xs mt-1">
              Phone number must be between 10 and 11 characters.
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="skillSets"
          >
            Skill sets
          </label>
          <input
            type="text"
            id="skillSets"
            className="p-2 border rounded w-full"
            value={skillsets}
            onChange={(e) => setSkillsets(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hobbies"
          >
            Hobbies
          </label>
          <input
            type="text"
            id="hobbies"
            className="p-2 border rounded w-full"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={handleEditUser}
          >
            Update User
          </button>
          <Link
            to="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-4 transition duration-300 ease-in-out"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
