import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorhandler.js";
import basicAuth from "./auth/basicAuth.js";
import methodOverride from "method-override";
import ejs from "ejs";
import {
    createBlog,
    editBlog,
    getAllBlogs,
    renderOneBlog,
    deleteBlog,
    renderEditForm,
    renderAllBlogs,
} from "./controller/blogsController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.listen(3000, () => console.log("Server running on port 3000"));

app.set("view engine", "ejs");
app.set("views");

app.use("/css", express.static(path.join(__dirname, "public", "css")));

app.use(
    "/new",
    basicAuth,
    express.static(path.join(__dirname, "public", "new"))
);
app.use("/home", express.static(path.join(__dirname, "public", "home")));
app.use(
    "/admin",
    basicAuth,
    express.static(path.join(__dirname, "public", "admin"))
);
app.use("/edit/:id", basicAuth);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger);

// GET /api/home
// get all blogs json
app.get("/api/home", getAllBlogs);

// GET /home
app.get("/home", renderAllBlogs);

// GET /article/:id
app.get("/article/:id", renderOneBlog);

// GET /edit/id
app.get("/edit/:id", renderEditForm);

// POST /new
app.post("/new", createBlog);

// PUT /edit/id
app.put("/edit/:id", editBlog);

// DELETE delete/id
app.delete("/delete/:id", deleteBlog);

// error handler
app.use(errorHandler);
