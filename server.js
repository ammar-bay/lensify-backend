require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;


// Connect to MongoDB
connectDB();


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// public routes
app.use("/", require("./routes/root"));
// app.use("/bulkbuy", require("./routes/bulkbuy"));
// app.use("/aboutus", require("./routes/aboutus"));
// app.use("/register", require("./routes/register"));
// app.use("/login", require("./routes/login"));
app.use("/order", require("./routes/order"));

// app.use('/refresh', require('./routes/refresh'));
// app.use("/appointment",require("./routes/appointment"))
// app.use('/logout', require('./routes/logout'));

// private routes
// app.use(verifyJWT);
// app.use("/visits",require("./routes/visits"))
// app.use("/patients",require("./routes/patients"))
// app.use("/searchbarlist",require("./routes/searchbarlist"))
// app.use("/appointments",require("./routes/appointments"))
// app.use("/waitinglist",require("./routes/waitinglist"))
// app.use('/users', require('./routes/users'));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
