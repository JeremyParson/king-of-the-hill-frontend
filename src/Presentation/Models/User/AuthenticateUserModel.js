import { useState, useContext } from "react";
import loginUser from "../../../Domain/UseCase/User/LoginUser";
import getProfile from "../../../Domain/UseCase/User/GetProfile";
import { UserReducerContext } from "../../Context/UserReducerContext";

export default function AuthenticateUserModel() {
  const {setUser} = useContext(UserReducerContext)

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  function onChange(value, prop) {
    setValues({ ...values, [prop]: value });
  }

  async function authUser() {
    await loginUser(values);
    const user = await getProfile()
    setUser(user)
  }

  return {
    ...values,
    onChange,
    authUser,
  };
}
