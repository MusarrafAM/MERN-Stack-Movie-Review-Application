const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // To Avoid Network issues

// Database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  const movieSchema = new mongoose.Schema({
    name: String,
    review: String,
  });

  // Create Model
  const Movie = mongoose.model("Movie", movieSchema);
  const Avatar = new Movie({ name: "Avatar", review: "Amazing Visuals" });
  await Avatar.save();

  const app = express();
  app.use(cors());
  app.use(express.json()); // !Add this so that when getting data it will get as a json Data when reciving it.
  app.use(express.urlencoded({ extended: false }));

  app.get("/get", async (req, res) => {
    const all_movies = await Movie.find({});
    res.send(all_movies);
  });

  app.post("/api/insert", async (req, res) => {
    const movieName = req.body.name; //! Getting from api parameter.
    const movieReview = req.body.review;
    const newMovie = new Movie({ name: movieName, review: movieReview });
    await newMovie
      .save()
      .then((data) => {
        console.log("Movie Review Added", data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/delete/:movieName", async (req, res) => {
    const recievedName = req.params.movieName; //! Getting from url
    // Delete a single document
    await Movie.deleteOne({ name: recievedName }); // returns {deletedCount: 1}
  });

  app.put("/update", async (req, res) => {
    const selectedName = req.body.name;
    const newReview = req.body.review;
    // Update a single document
    await Movie.updateOne({ name: selectedName }, { review: newReview });
  });

  app.listen(3001, function () {
    // in port 3000 our frontend is hosted.
    console.log("Server has started.");
  });
}
