import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllMovies,
  addMovie,
  updateMovie,
  deteleMovie,
} from "../../calls/movie";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import moment from "moment";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const allMovies = await getAllMovies();
      setMovies(
        allMovies.data.map((movie) => {
          return { ...movie, key: `movie${movie._id}` };
        })
      );
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={data.poster}
            alt="movie poster"
          />
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      detaIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("DD-MM-YYYY");
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
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
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
          Add Movie
        </Button>
      </div>
      <Table dataSource={movies} columns={tableHeadings} />;
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </>
  );
};

export default MovieList;
