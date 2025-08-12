import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  author: String,
  quote: String,
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
