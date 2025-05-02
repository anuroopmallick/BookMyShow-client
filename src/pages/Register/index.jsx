import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../calls/user";

const index = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      console.log(response);
      if (response.sussess) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
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
            <h1>Register to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input id="name" type="text" placeholder="Enter your Name" />
              </Form.Item>

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
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user ? <Link to="/login">Login</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
};

export default index;
