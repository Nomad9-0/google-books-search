const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedBookSchema = new Schema({
  title: String,
  authors: Array,
  description: String,
  image: String,
  link: String
});

const savedBook = mongoose.model("savedBookSchema", savedBookSchema);

module.exports = savedBook;