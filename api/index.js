const express = require("express");
const app = express();
const dotenv = require("dotenv");
//const bodyParser = require('body-parser');
//const passport = require('passport');
const cors = require('cors');

//Routes import
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const serieRoute = require("./routes/series");
const searchRoute = require("./routes/search");
const stripeRoute = require("./routes/stripe");
const subscriptionRoute = require("./routes/subscription");
const passwordReset = require("./routes/passwordReset");

//Config files import
const connectDB = require('./config/mongoDB');
//const connectDB_locally = require('./config/mongoDB_local');

const NodeMediaServer = require('node-media-server');

const config = {
  logType: 3,

  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8500,
    mediaroot: './content',
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();

dotenv.config();

app.use(express.static('content'));

//Cors policy para cada una de nuestros front-end
app.use(
  cors({
    origin: ["http://localhost:4000","http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

//Connect to DB
connectDB();

//Use JSON
app.use(express.json());

//Routes import
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/series", serieRoute);
app.use("/api/search", searchRoute);
app.use("/api/subscription", subscriptionRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/password-reset", passwordReset);

//Handle Errors
app.use(function (error, req, res, next) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});


//Console msg for server ini
app.listen(process.env.PORT, (error)=> {
  if (error) throw error;
  console.log("Backend server is running! in "+process.env.PORT)
});