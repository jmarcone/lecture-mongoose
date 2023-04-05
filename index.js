import Express from "express";
import mongoose from "./db/mongoose.js";
import userRoutes from "./routes/user.js";
import APIErrorHandler from "./middlewares/errorHandler.js";

const PORT = process.env?.PORT || 3000;

const app = Express();

app.use(Express.json()); 

app.use("/api/user", userRoutes);


app.use(APIErrorHandler);

app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`))