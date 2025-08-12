import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import quoteRouter from "./routes/quoteRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", quoteRouter);
app.use(express.static(path.join(__dirname, "client", "dist")));

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

app.get("/*wildcard", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//! code and data used to upload initial data to the server
// const quotesData = [
//   {
//     author: "Marcus Aurelius",
//     quote:
//       "You have power over your mind — not outside events. Realize this, and you will find strength.",
//   },
//   {
//     author: "Marcus Aurelius",
//     quote:
//       "The happiness of your life depends upon the quality of your thoughts.",
//   },
//   {
//     author: "Marcus Aurelius",
//     quote:
//       "Waste no more time arguing about what a good man should be. Be one.",
//   },
//   {
//     author: "Marcus Aurelius",
//     quote:
//       "If it is not right, do not do it. If it is not true, do not say it.",
//   },
//   {
//     author: "Marcus Aurelius",
//     quote:
//       "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
//   },
//   {
//     author: "Seneca",
//     quote: "We suffer more often in imagination than in reality.",
//   },
//   {
//     author: "Seneca",
//     quote:
//       "He suffers more than necessary, who suffers before it is necessary.",
//   },
//   {
//     author: "Seneca",
//     quote:
//       "It is not that we have a short time to live, but that we waste much of it.",
//   },
//   {
//     author: "Seneca",
//     quote: "Luck is what happens when preparation meets opportunity.",
//   },
//   {
//     author: "Seneca",
//     quote: "Difficulties strengthen the mind, as labor does the body.",
//   },
//   {
//     author: "Epictetus",
//     quote:
//       "It’s not what happens to you, but how you react to it that matters.",
//   },
//   {
//     author: "Epictetus",
//     quote: "No man is free who is not master of himself.",
//   },
//   {
//     author: "Epictetus",
//     quote:
//       "Wealth consists not in having great possessions, but in having few wants.",
//   },
//   {
//     author: "Epictetus",
//     quote:
//       "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
//   },
//   {
//     author: "Epictetus",
//     quote:
//       "First say to yourself what you would be; and then do what you have to do.",
//   },
//   {
//     author: "Zeno of Citium",
//     quote: "Man conquers the world by conquering himself.",
//   },
//   {
//     author: "Zeno of Citium",
//     quote: "Happiness is a good flow of life.",
//   },
//   {
//     author: "Musonius Rufus",
//     quote:
//       "If you accomplish something good with hard work, the labor passes quickly, but the good endures.",
//   },
//   {
//     author: "Musonius Rufus",
//     quote:
//       "We begin to lose our hesitation to do immoral things when we lose our hesitation to speak of them.",
//   },
//   {
//     author: "Seneca",
//     quote:
//       "Begin at once to live, and count each separate day as a separate life.",
//   },
// ];
// async function insertQuotes() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");

//     await Quote.deleteMany({});

//     await Quote.insertMany(quotesData);
//     console.log("Quotes inserted successfully");

//     await mongoose.disconnect();
//     console.log("Disconnected from DB");
//   } catch (error) {
//     console.error("Error: " + error);
//   }
// }
// insertQuotes();
