import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { getMovie } from "../calls/movie";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { getAllTheatresByMovie } from "../calls/show";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";
import { Input, Row, Col, Divider } from "antd";

const SingleMovie = () => {
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };

  async function getData() {
    try {
      dispatch(showLoading());
      const response = await getMovie(params.id);

      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
    }
  }

  async function getTheatres() {
    try {
      dispatch(showLoading());
      const response = await getAllTheatresByMovie({
        movie: params.id,
        date: date,
      });

      console.log("theatres", response);
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date]);

  return (
    <>
      <div className="inner-container">
        {movie && (
          <div className="d-flex single-movie-div">
            <div className="flex-Shrink-0 me-3 single-movie-img">
              <img src={movie.poster} width={150} alt="Movie Poster" />
            </div>
            <div className="w-100">
              <h1 className="mt-0">{movie.name}</h1>
              <p className="movie-data">
                Language: <span>{movie.language}</span>
              </p>
              <p className="movie-data">
                Genre: <span>{movie.genre}</span>
              </p>
              <p className="movie-data">
                Release Date:{" "}
                <span>{moment(movie.date).format("MMM Do YYYY")}</span>
              </p>
              <p className="movie-data">
                Duration: <span>{movie.duration} Minutes</span>
              </p>
              <hr />
              <div className="d-flex flex-column-mob align-items-center mt-3">
                <label className="me-3 flex-shrink-0">Choose the date:</label>
                <Input
                  onChange={handleDate}
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="max-width-300 mt-8px-mob"
                  value={date}
                  placeholder="default size"
                  prefix={<CalendarOutlined />}
                />
              </div>
            </div>
          </div>
        )}
        {theatres.length === 0 && (
          <div className="pt-3">
            <h2 className="blue-clr">
              Currently, no theatres available for this movie!
            </h2>
          </div>
        )}
        {theatres.length > 0 && (
          <div className="theatre-wrapper mt-3 pt-3">
            <h2>Theatres</h2>
            {theatres.map((theatre) => {
              return (
                <div key={theatre._id}>
                  <Row gutter={24} key={theatre._id}>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <h3>{theatre.name}</h3>
                      <p>{theatre.address}</p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                      <ul className="show-ul">
                        {theatre.shows
                          .sort(
                            (a, b) =>
                              moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                          )
                          .map((singleShow) => {
                            return (
                              <li
                                key={singleShow._id}
                                onClick={() =>
                                  navigate(`/book-show/${singleShow._id}`)
                                }
                              >
                                {moment(singleShow.time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleMovie;
