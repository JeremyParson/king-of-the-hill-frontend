import { useContext, useState } from "react";
import { UserReducerContext } from "../../Context/UserReducerContext";

export default function ProfileModel() {
  const { user } = useContext(UserReducerContext);
  const [displayLogin, setDisplayLogin] = useState(false)
  return {user, displayLogin, setDisplayLogin};
}
