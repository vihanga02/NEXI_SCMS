import express from "express";
import cors from "cors";
import router from "./Routes/Index.js";
import cookieParser from "cookie-parser";

const port = 3001;
const app = express();

// CORS configuration to allow requests only from your frontend
const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:3002"], 
  methods: ["GET", "POST", "DELETE"], 
  credentials: true, 
};

app.use(cors(corsOptions)); // Apply CORS with options

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/nexi", router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
