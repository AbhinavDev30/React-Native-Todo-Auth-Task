import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./dbConnection.js";
import cookieParser from "cookie-parser";
import {
  addData,
  deleteData,
  getData,
  updateData,
} from "./controllers/todoController.js";
import {
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "./controllers/userController.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Define routes
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/forget", forgetPassword);
app.post("/resetpassword", resetPassword); 
app.post("/adddata", addData);
app.get("/getdata", getData);
app.put("/updatedata/:id", updateData);
app.delete("/deletedata/:id", deleteData);

// Database connection and server running
databaseConnection()
  .then(() => {
    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () =>
      console.log(`Server is successfully running on port number ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(`Failed to connect to the database ${err}`);
  });
