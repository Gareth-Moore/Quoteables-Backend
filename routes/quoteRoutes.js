import express from "express";
import { getQuotes } from "../controllers/getQuotesController.js";

const router = express.Router();

router.route("/quotes").get(getQuotes);

export default router;
