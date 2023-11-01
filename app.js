const express = require("express")
//book est le modele de donner 
const book = require ("./models/book")
const bookRoutes =require("./routers/book")
const userRoutes =require("./routers/user")
const authRoutes =require("./routers/author")
const CatRoutes =require("./routers/category")


const { default: mongoose } = require("mongoose")
//crée une instance d'Express
const app = express()
// établit une connexion à une base de données MongoDB
mongoose
.connect(
    "mongodb://127.0.0.1:27017/database",
    {useNewUrlParser : true, useUnifiedTopology : true })
    .then(() => 
    console.log("connexion a MongoDB réussite !"))
    .catch ((e) => console.log ("connexion a MongoDB echoué ",e)

)

app.use(express.json())


app.use ("/api/books",bookRoutes)
app.use ("/api/auth",userRoutes)
app.use ("/api/author",authRoutes)
app.use ("/api/cat",CatRoutes)

module.exports =app

