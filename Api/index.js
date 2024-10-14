import express from "express";
import cors from "cors";

//database connection
import connect from "./src/database/mongodb.js";

//load env variables
process.loadEnvFile();


//connect to database
connect();

//initialize express app
const app = express();

//configure cors options
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: "GET,HEAD,OPTIONS,POST,PUT,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
};

// use middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//import routes

//use routes


//define port
const PORT = process.env.PORT || 5000;


//listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
