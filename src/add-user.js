import React, { useState } from "react";

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skillsets, setSkillsets] = useState("");
  const [hobby, setHobby] = useState("");

  const handleSubmit = async (e) => {
    console.log("wdwddw");
    e.preventDefault();
    try {
      await fetch(`/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phoneNumber,
          skillsets,
          hobby,
        }),
      });
      alert("User added successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="container mx-4 md:mx-auto p-4 bg-white rounded-lg shadow-lg my-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add User</h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
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
              type="text"
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
              htmlFor="phoneNumber"
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
              htmlFor="phoneNumber"
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
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
