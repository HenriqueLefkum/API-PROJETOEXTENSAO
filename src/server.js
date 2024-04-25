require("express-async-errors");
const cors = require("cors");
const migrationsRun = require("./database/sqlite3/migrations");
const AppError = require("./utils/AppError");

const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("trust proxy", true);
app.use(express.json());

app.use(routes);
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Headers", "");
  next();
});
migrationsRun();

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  
    // Para outros tipos de erro não tratados especificamente:
    console.error(error);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  });
  

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
