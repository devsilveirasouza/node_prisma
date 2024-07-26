import { Router } from "express";
import { CreateMovieController } from "../modules/movies/useCases/createMovie/createMovieController";

const movieRoutes = Router();

const createMovieController = new CreateMovieController();

movieRoutes.post("/", createMovieController.handle);

export { movieRoutes };
