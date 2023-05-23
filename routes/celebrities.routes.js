const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

module.exports = router;

router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
  
    // Create a new celebrity using the Celebrity model
    const newCelebrity = new Celebrity({
      name,
      occupation,
      catchPhrase
    });
  
    // Save the new celebrity to the database
    newCelebrity.save()
      .then(() => {
        // Redirect to the list of celebrities
        res.redirect("/celebrities");
      })
      .catch((error) => {
        // Render the new-celebrity view with the error message
        res.render("celebrities/new-celebrity", { error });
      });
  });
  
  module.exports = router;

  router.get("/", (req, res) => {
    // Retrieve all celebrities from the database
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/celebrities", { celebrities });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
  
  module.exports = router;
  