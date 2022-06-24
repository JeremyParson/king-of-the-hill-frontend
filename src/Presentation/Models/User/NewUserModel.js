import { useState } from "react";
import registerUser from "../../../Domain/UseCase/User/RegisterUser";

export default function NewUserModel() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: ""
  });

  function onChange(value, prop) {
    setValues({ ...values, [prop]: value });
  }

  async function saveUser() {
    await registerUser(values);
  }

  return {
    ...values,
    onChange,
    saveUser,
  };
}
