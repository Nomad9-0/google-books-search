const router = require("express").Router();
const savedBooksController = require("../../controllers/savedBooksController");

// Matches saved
router.route("/")
    .get(savedBooksController.findAll)
    .post(savedBooksController.create);

// Matches with id
router  
    .route("/:id")
    .get(savedBooksController.findById)
    .put(savedBooksController.update)
    .delete(savedBooksController.remove);

module.exports = router;