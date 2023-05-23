const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      res.render("error", { error });
    });
});



module.exports = router;

router.post("/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;
  
    // Create a new movie using the Movie model
    const newMovie = new Movie({
      title,
      genre,
      plot,
      cast: cast instanceof Array ? cast : [cast]
    });
  
    // Save the new movie to the database
    newMovie.save()
      .then(() => {
        // Redirect to the list of movies
        res.redirect("/movies");
      })
      .catch((error) => {
        // Render the new-movie view with the error message
        res.render("movies/new-movie", { error });
      });
  });
  
  module.exports = router;
  
  router.get("/", (req, res) => {
    // Retrieve all movies from the database
    Movie.find()
      .then((movies) => {
        res.render("movies/movies", { movies });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
  
  module.exports = router;
  
  router.get("/:id", (req, res) => {
    const { id } = req.params;
  
    // Retrieve the movie details from the database
    Movie.findById(id).populate('cast')
      .then((movie) => {
        res.render("movies/movie-details", { movie });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
  
  module.exports = router;
  
  router.post("/:id/delete", (req, res) => {
    const { id } = req.params;
  
    // Delete the movie from the database by its ID
    Movie.findByIdAndRemove(id)
      .then(() => {
        // Redirect to the list of movies
        res.redirect("/movies");
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
  
  module.exports = router;
  
  router.get("/:id/edit", (req, res) => {
    const { id } = req.params;
  
    // Retrieve the movie details from the database
    Movie.findById(id).populate('cast')
      .then((movie) => {
        Celebrity.find()
          .then((celebrities) => {
            res.render("movies/edit-movie", { movie, celebrities });
          })
          .catch((error) => {
            res.render("error", { error });
          });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
  
  module.exports = router;

  router.post("/:id", (req, res) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
  
    // Find the movie by its ID and update its details
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
      .then(() => {
        // Redirect to the movie details page
        res.redirect(`/movies/${id}`);
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
  
  module.exports = router;
  