import React from "react";
import useViewModel from "../../Models/User/NewUserModel";

export default function RegisterUser() {
  let { email, username, password, onChange, saveUser } = useViewModel();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser();
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e.target.value, e.target.name)}
        ></input>
        <br></br>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => onChange(e.target.value, e.target.name)}
        ></input>
        <br></br>
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => onChange(e.target.value, e.target.name)}
        ></input>
        <br></br>
        <input type="submit" />
      </form>
    </div>
  );
}
