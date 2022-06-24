// Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Style
import "./App.css";

// Views
import RegisterUser from "./Presentation/Views/User/RegisterUser";
import NavigationBar from "./Presentation/Components/NavigationBar";
import IndexHills from "./Presentation/Views/Hill/IndexHill";
import CreateHill from "./Presentation/Views/Hill/CreateHill";
import HillDetail from "./Presentation/Views/Hill/HillDetail";
import UpdateHill from "./Presentation/Views/Hill/UpdateHill";

// User Data
import { UserReducerContext } from "./Presentation/Context/UserReducerContext";
import useViewModel from "./Presentation/Models/User/ResumeSessionModel"

function App() {
  const { user, setUser } = useViewModel()
  return (
    <UserReducerContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
      <NavigationBar />
        <Routes>
          <Route path="/" element={<IndexHills />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/create-hill" element={<CreateHill />} />
          <Route path="/hill/:id" element={<HillDetail />} />
          <Route path="/edit/:id" element={<UpdateHill />} />
        </Routes>
      </BrowserRouter>
    </UserReducerContext.Provider>
  );
}

export default App;
