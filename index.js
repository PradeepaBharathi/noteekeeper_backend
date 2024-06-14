import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnection } from './db.js';
import { note_router } from './Route/noteRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
dbConnection()
const PORT = process.env.PORT;

app.use("/note-keeper",note_router)
app.get("/", async (req, res) => {
  return res.status(201).send({ message: "Notes Backend Working Properly" });
});
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});