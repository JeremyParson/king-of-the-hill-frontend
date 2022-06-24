import useViewModel from "../Models/User/ProfileModel";
import LoginUser from "../Views/User/LoginUser";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const { user, displayLogin, setDisplayLogin } = useViewModel();
  const display = () => {
    if (user?.username) return user.username;
    if (displayLogin) {
      return <LoginUser />;
    } else {
      return <button onClick={(e) => setDisplayLogin(true)}>Login</button>;
    }
  };
  return (
    <div className="bg-blue-400 flex flex-row justify-between">
      <Link to="/">
        <img src="./logo.png" className="w-32 mx-3" />
      </Link>

      <div className="mx-3 my-auto">{display()}</div>
    </div>
  );
}
