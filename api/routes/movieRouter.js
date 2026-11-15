import { Router } from "express";
import { getMovieById, search } from "../controllers/movieController.js";

const router = Router()

router.get('/search',search)
// esimerkkiosoite elokuvien hakemiseen
/*
http://localhost:5173/api/movie/search?query=testihaku
*/
router.get('/id',getMovieById)
// esimerkkiosoite elokuvan tietojen hakemiseen
/*
http://localhost:5173/api/movie/id?query=testihaku
*/


export default router