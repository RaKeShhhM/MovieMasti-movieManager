import express from "express";
const router = express.Router();

// Controllers
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Routes for genres - Admin for create, update, delete; Public for list and read
router.route("/").post(authenticate, authorizeAdmin, createGenre);

// Update and delete routes can be combined since they both require the genre ID as a parameter
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);

// Delete route for a genre
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);

// List all genres and read a specific genre by ID - Public routes
router.route("/genres").get(listGenres);

// Get a specific genre by ID - Public route
router.route("/:id").get(readGenre);

export default router;
