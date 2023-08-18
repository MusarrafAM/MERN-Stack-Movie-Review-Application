import { useState, useEffect } from "react";
import Axios from "axios"; // This is for requseting api/POST requset
import "./App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, [movieReviewList]);

  function submitionClicked() {
    Axios.post("http://localhost:3001/api/insert", {
      name: movieName,
      review: movieReview,
    }).then(() => {
      alert("Successfull Inster");
    });
    setMovieName("");
    setMovieReview("");
  }

  function deleteReview(movie) {
    Axios.delete("http://localhost:3001/delete/" + movie);
  }

  function updateReview(movie) {
    Axios.put("http://localhost:3001/update", {
      name: movie,
      review: newReview,
    });
    
  }

  return (
    <div className="App">
      <h1>Movie Review CRUD Application</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Movie Review</label>
        <input
          type="text"
          name="review"
          value={movieReview}
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        />
        <Button variant="contained" onClick={submitionClicked} >
          Submit
        </Button>

        {movieReviewList.map((eachMovie) => {
          return (
            <div className="card">
              <h1>{eachMovie.name}</h1>
              <p>{eachMovie.review}</p>

              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  deleteReview(eachMovie.name);
                }}
                color="error"
              >
                Delete
              </Button>

              <input
                type="text"
                id="updateInput"
                onChange={(e) => setNewReview(e.target.value)}
              ></input>
              <Button
                variant="contained"
                onClick={() => {
                  updateReview(eachMovie.name);
                }}
              >
                Update
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
