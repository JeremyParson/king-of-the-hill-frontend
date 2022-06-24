import React from "react";
import useViewModel from "../../Models/User/AuthenticateUserModel";

export default function LoginUser() {
  let { email, password, onChange, authUser } = useViewModel();

  const handleSubmit = (e) => {
    e.preventDefault();
    authUser();
  };

  return (
    <div className="bg-blue-400">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
        ></input>
        <br></br>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e.target.value, e.target.name)}
          className="border-2	border-black mx-3 my-1"
        ></input>
        <br></br>
        <input type="submit" className="border-2 border-black mx-3 my-1 py-1 px-1"/>
      </form>
    </div>
  );
}
