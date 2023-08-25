const express = require("express");
const Book = require("../models/book");
const fs = require('fs'); // For reading JSON files
const path = require('path'); // For handling file paths
const Ajv = require('ajv'); // JSONSchema validation library

// Create an instance of Ajv
const ajv = new Ajv();

// Load the JSONSchema from book-schema.json
const schemaPath = path.join(__dirname, '..', 'models', 'book-schema.json'); // Adjust the path as needed
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// Compile the JSONSchema
const validate = ajv.compile(schema);

// Now you can use the 'validate' function to validate your data
const isValid = validate(dataToValidate);
if (!isValid) {
  const validationErrors = validate.errors;
  // Proceed with handling validation errors and constructing error messages
}
const router = new express.Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;