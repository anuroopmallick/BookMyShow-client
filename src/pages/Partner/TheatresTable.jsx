import React, { useState, useEffect } from "react";
import TheatreForm from "./TheatreForm";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTheatres } from "../../calls/theatre";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";

const TheatresTable = () => {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");

  const dispatch = useDispatch();

  async function getData() {
    try {
      dispatch(showLoading);
      let theatres = await getAllTheatres();
      let data = theatres.data;
      setTheatres(
        data.map((item) => {
          return {
            ...item,
            key: `theatre${item._id}`,
          };
        })
      );
      dispatch(hideLoading);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const tableHeadings = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTheatre(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table columns={tableHeadings} dataSource={theatres}></Table>
      {isModalOpen && (
        <TheatreForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheatre={selectedTheatre}
          formType={formType}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          seletedTheatre={selectedTheatre}
          setSeletedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
    </>
  );
};

export default TheatresTable;
