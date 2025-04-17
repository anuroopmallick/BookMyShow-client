import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../calls/users";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      console.log(response);
      if (response.success) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        navigate("/");
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
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
            </div>
          </section>
        </main>
      </header>
    </>
  );
};

export default Login;
