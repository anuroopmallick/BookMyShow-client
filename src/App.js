import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import Register from "./pages/Register/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
