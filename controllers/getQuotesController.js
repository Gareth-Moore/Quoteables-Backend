import Quote from "../models/Quote.js";

import asyncHandler from "express-async-handler";

export const getQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quote.find({});

  res.json(quotes);
});
