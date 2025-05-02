import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";

const Admin = () => {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
    </div>
  );
};

export default Admin;
