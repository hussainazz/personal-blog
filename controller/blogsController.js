import fs from "node:fs";

let blogs;

try {
    blogs = JSON.parse(fs.readFileSync("./db/blogs.json"));
} catch {
    blogs = [];
}

function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
    }${day}`;
    return formattedDate;
}

function writeFile() {
    fs.writeFileSync("./db/blogs.json", JSON.stringify(blogs));
}

// GET /api/home
let getAllBlogs = (req, res, next) => {
    res.status(200).json(blogs);
    res.end();
    next();
};

// GET /home
let renderAllBlogs = (req, res, next) => {

    res.render("./home/index", {
        blogList: blogs
    });
};

// GET /article/id
let renderOneBlog = (req, res, next) => {
    let id = req.params.id;
    let blog = blogs.find((article) => article.id == id);
    if (!blog) {
        let error = new Error(`Can't find blog with id: ${id}.`);
        error.status = 404;
        next(error);
    }
    res.render("./article/index", {
        title: blog.title,
        publishDate: blog.date,
        article: blog.article,
    });
};

// POST /new
let createBlog = (req, res, next) => {
    let newId = blogs.length + 1;
    let title = req.body.title;
    let article = req.body.article;

    if (newId === blogs.length) {
        newId++;
    }

    if (!title) {
        let error = new Error("You should include a title.");
        error.status = 400;
        next(error);
    }

    let newArticle = {
        id: newId,
        title: title,
        article: article,
        date: currentDate(),
    };
    blogs.push(newArticle);
    writeFile();
    res.redirect("/admin");
};

// PUT /edit/id
let editBlog = (req, res, next) => {
    let id = req.params.id;
    let newTitle = req.body.title;
    let newArticle = req.body.article;
    let articleToUpdate = blogs.find((article) => article.id == id);

    if (!articleToUpdate) {
        let error = new Error(`article with id: ${id} not found.`);
        error.status = 404;
        next(error);
    }

    blogs.find((blog) => blog.id == id)["title"] = newTitle;
    blogs.find((blog) => blog.id == id)["article"] = newArticle;
    writeFile();
    res.redirect("/admin");
};

// DELETE /delete/id
let deleteBlog = (req, res, next) => {
    let id = req.params.id;
    let articleToDelete = blogs.find((article) => article.id == id);

    if (!articleToDelete) {
        let error = new Error(`article with id: ${id} not found.`);
        error.status = 404;
        next(error);
    }

    blogs = blogs.filter((article) => article.id != id);
    writeFile();
    res.end();
};

// GET /edit/id
let renderEditForm = (req, res, next) => {
    let id = req.params.id;
    let blogToEdit = blogs.find((blog) => blog.id == id);

    if (!blogToEdit) {
        let error = new Error(`Can't find blogs with id: ${id}`);
        error.status = 404;
        next(error);
        return;
    }

    res.render("./edit/index", {
        id: id,
        title: blogToEdit.title,
        article: blogToEdit.article,
    });
};

export {
    getAllBlogs,
    renderOneBlog,
    createBlog,
    editBlog,
    deleteBlog,
    renderEditForm,
    renderAllBlogs,
};
