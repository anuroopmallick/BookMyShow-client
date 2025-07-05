import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../calls/user";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PageNotFound from "../pages/Page-not-found/PageNotFound";

function ProtectedRoute({ children }) {
  const { user } = useSelector((store) => {
    return store.users;
  });
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },

    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },

        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setUser(null));
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const roleBasedRoutes = {
    admin: ["/", "/admin", "/profile"],
    partner: ["/", "/partner", "/profile"],
    user: ["/", "/movie", "/book-show", "/profile"],
  };

  let path = "/" + location.pathname.split("/")[1];
  let isAllowed = roleBasedRoutes[user?.role]?.includes(path);

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response.data));
      dispatch(hideLoading());
      return response;
      // Hide Loader
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("token present in LS");
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {isAllowed ? children : <PageNotFound />}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
