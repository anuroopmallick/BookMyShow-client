import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import Register from "./pages/Register/index";
import ProtectedRoute from "./Components/ProtectedRoute";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
        <Route path={"/admin"} element={<Admin />}></Route>
        <Route path={"/partner"} element={<Partner />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
