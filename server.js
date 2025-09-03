import express from 'express'
import path from "node:path"
import { fileURLToPath } from 'url'
import { logger } from "./middleware/logger.js"
import { errorHandler } from "./middleware/errorhandler.js"
import {createArticle, updateArticle, getAllBlogsJson, getOneArticle, deleteArticle, showEditForm, renderAllBlogs} from "./controller/blogsController.js"
import methodOverride from "method-override"
import ejs from "ejs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.listen(3000, () => console.log("Server running on port 3000"))

app.set("view engine", "ejs")
app.set("views")

app.use('/new', express.static(path.join(__dirname, "public", "new")))
app.use("/home", express.static(path.join(__dirname, "public", "home")))
app.use(express.json())
app.use(express.urlencoded({ extended: false  }))
app.use(methodOverride("_method"))
app.use(logger)

// GET /api/home
// get all blogs
app.get("/api/home", getAllBlogsJson )

// GET /home
// render blogs
app.get("/home", renderAllBlogs)

// GET /article/:id
// get one blog
app.get("/article/:id", getOneArticle)

// POST /new
// create new blog
app.post("/new", createArticle)

// PUT /edit/2
// update an article
app.put("/edit/:id", updateArticle)

// GET /edit
// get the form to edit
app.get("/edit/:id", showEditForm)

// DELETE delete/id
// remove an article
app.delete("/delete/:id", deleteArticle)

// error handler
app.use(errorHandler)
