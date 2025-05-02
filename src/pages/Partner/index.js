import React from "react";
import TheatresTable from "../Partner/TheatresTable";
import { Tabs } from "antd";

const Partner = () => {
  const tabItems = [
    {
      key: "1",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];

  return (
    <div>
      <h1>Partner Page</h1>
      <Tabs items={tabItems} />
    </div>
  );
};

export default Partner;
