import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import Register from "./pages/Register/index";
import ProtectedRoute from "./Components/ProtectedRoute";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";
import SingleMovie from "./pages/SingleMovie";
import BookShow from "./pages/BookShow";
import Profile from "./pages/Profile/index";

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
        <Route
          path={"/admin"}
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={"/partner"}
          element={
            <ProtectedRoute>
              <Partner />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={"/movie/:id"}
          element={
            <ProtectedRoute>
              <SingleMovie />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={"/book-show/:id"}
          element={
            <ProtectedRoute>
              <BookShow />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
