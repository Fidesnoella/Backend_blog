const express = require(`express`);
const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);
const contactRoute = require("./routes/contact");
const articleRoute = require(`./routes/article`);
const userRoute = require(`./routes/user`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require("body-parser");
const cors = require(`cors`);
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const swaggerJsDoc = require(`swagger-jsdoc`);
const swaggerUi = require(`swagger-ui-express`);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(`public`));
app.use(cookieParser());
// connect to database

const swaggerOptions = {
  swaggerDefinition: {
    openapi: `3.0.0`,
    info: {
      title: `API`,
      description: `APIs information of my capstone project`,
      version: `1.0.0`,
      contact: {
        name: `Iragena Fides Noella`,
        email: `fniragena@gmail.com`,
      },
      servers: [
        {
          url: "http://localhost:3000",
          name: "Local server",
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route Mildwares
app.use(`/users`, userRoute);
app.use(`/articles`, articleRoute);
app.use(`/contact`, contactRoute);
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/*", (req, res) => {
  res.status(404).json({
    status: `fail`,
    message: `Page Not found`,
  });
});

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log(`connected to db`);
    module.exports = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
