import { Router } from "express";
import { search } from "../controllers/movieController.js";

const router = Router()

router.get('/search',search)
// esimerkki osoite elokuvien hakemiseen
/*
http://localhost:5173/api/movie/search?query=testihaku
*/

export default router