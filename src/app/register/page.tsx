"use client"

import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    console.log(formData);
    alert(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input name="firstName" type="text" onChange={handleChange} />
      </div>

      <div>
        <label>Last Name:</label>
        <input name="lastName" type="text" onChange={handleChange} />
      </div>

      <div>
        <label>Email:</label>
        <input name="email" type="email" onChange={handleChange} />
      </div>

      <div>
        <label>Password:</label>
        <input name="password" type="password" onChange={handleChange} />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
