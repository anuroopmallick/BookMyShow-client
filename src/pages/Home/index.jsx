import React, { useState, useEffect } from "react";
import { Row, Col, message, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../calls/movie";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  async function getData() {
    try {
      dispatch(showLoading());
      const movies = await getAllMovies();
      setMovies(movies.data);
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.name.toLowerCase().includes(search.toLocaleLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.name}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
    </>
  );
};

export default Home;
