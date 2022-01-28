
const express = require(`express`);
const mongoose = require(`mongoose`);
const contactRoute = require(`./routes/contact`);
const articleRoute = require(`./routes/article`);
const userRoute = require(`./routes/user`);
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);
const dotenv = require("dotenv")
dotenv.config()

const app = express();
app.use(cors())
const swaggerJsDoc = require(`swagger-jsdoc`);
const swaggerUi = require(`swagger-ui-express`);

app.use(express.json());
app.use(express.static(`public`));
app.use(cookieParser());




// connect to database
const dbURI= process.env.MONGODB_URI ||`mongodb+srv://fides:fides123@mybrand.zytgh.mongodb.net/Mybrand?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log(`connected to db`))
.catch((err) => console.log(err));

app.get(`/`, (req, res) =>{
    res.send(`WELCOME!`);
})

const swaggerOptions ={
    swaggerDefinition: {
        openapi:`3.0.0`,
        info: {
            title: `API`,
            description: `APIs information of my capstone project`,
            version:`1.0.0`,
            contact: {
                name:`Iragena Fides Noella`,
                email: `fniragena@gmail.com`
            },
            servers:[
                {
                url: "http://localhost:3000",
                name: "Local server",
            },
        ],
        }
    },
    apis: ["./routes/*.js"] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(`/api-docs`, swaggerUi.serve , swaggerUi.setup(swaggerDocs));



// Route Mildwares
app.use(`/users`, userRoute);
app.use(`/articles`, articleRoute);
app.use(`/contact`, contactRoute);

// app.get(`/`, (req, res) => res.render(`index`));
// app.get(`/signup`, (req, res) => res.render(`signup`));
// app.get(`/login`, (req, res) => res.render(`login`));
// app.get(`/contact`, (req, res) => res.render(`contact`));


app.use(`/*`, (req,res) =>{
    res.status(404).json({
        status: `fail`,
        message: `Page Not found`
    });
});

// app.listen(3000, () => console.log(`server running`))

const PORT = process.env.PORT || 3000
module.exports = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

