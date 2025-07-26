import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../calls/user";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { GetCurrentUser } from "../../calls/user";
import { setUser } from "../../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => {
    return store.users;
  });

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      console.log(response);
      if (response.success) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        localStorage.setItem("token", response.data);
        let userRole = await getValidUser();

        if (userRole.data.role === "admin") {
          navigate("/admin");
        } else if (userRole.data.role === "partner") {
          navigate("/partner");
        } else {
          navigate("/");
        }
      } else {
        messageApi.open({
          type: "error",
          content: response.response.data.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

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

  return (
    <>
      {contextHolder}
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Book My Cinema</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input id="email" type="text" placeholder="Enter your Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                htmlFor="password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                />
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                New User ? <Link to="/register">Register</Link>
              </p>
              <p>
                Forgot Password ? <Link to="/forgotpassword">Click Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
};

export default Login;
