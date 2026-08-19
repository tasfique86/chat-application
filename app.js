//external inputs
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const moment = require("moment");
const { Server } = require("socket.io");

//internal inputs
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");

//const userRouter = require("./routers/userRouter");

//load environment variables
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parse urlencoded request body

//set view engine
app.set("view engine", "ejs");

// expose moment to templates
app.locals.moment = moment;

//set static folder

app.use(express.static(path.join(__dirname, "public")));

//parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));

//routers setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//routing handlers

//error handler
app.use(notFoundHandler);
app.use(errorHandler);

// create HTTP server and Socket.IO instance
const server = http.createServer(app);
global.io = new Server(server);

global.io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

//start server
server.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} is running on port ${process.env.APP_PORT}`,
  );
});
