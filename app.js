import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/connectDB.js";
import userRoute from "./routes/user.route.js";


dotenv.config();
dbConnect()

const app = express();
app.use(express.json());

app.use("/api", userRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
