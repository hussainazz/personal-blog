import express from 'express'
import path from "node:path"
import { fileURLToPath } from 'url'
import { logger } from "./middleware/logger.js"
import { errorHandler } from "./middleware/errorhandler.js"
import {createArticle, updateArticle, getAllBlogs, getOneArticle, deleteArticle} from "./controller/blogsController.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.listen(3000, () => console.log("Server running on port 3000"))

app.use('/new', express.static(path.join(__dirname, "public", "new")))
app.use("/home", express.static(path.join(__dirname, "public", "home")))

app.use(logger)
app.use(express.json())
app.use(express.urlencoded())

// GET /home
// get all blogs
app.get("/home", getAllBlogs )

// GET /article/:id
// get one blog
app.get("/article/:id" , getOneArticle)

// create new blog
app.post("/new", createArticle)

// PUT /edit/2
// update an article
app.put("/edit/:id", updateArticle)

// DELETE delete/id
// remove an article
app.delete("/delete/:id", deleteArticle)

// error
app.use(errorHandler)