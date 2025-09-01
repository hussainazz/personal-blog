import blogs from "../blogs/blogs.js"

function currentDate() {
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate
}

// GET /home
// get all blogs
let getAllBlogs = (req, res, next) => {
    res.status(200).json(blogs)
    res.end()
    next()
}

// GET /article/id
// get one article
let getOneArticle = (req, res, next) => {
    let id = req.params.id
    let blog = blogs.find(article => article.id == id)

    if(!blog) {
        let error = new Error(`blog with id: ${id} not found.`)
        error.status = 404
        next(error)
    }
    
    res.render("./article/index", {
        title: blog.title,
        publishDate: blog.date,
        article: blog.article
    })
}

// POST /new
// Create blog
let createArticle = (req, res, next) => {
    let newId = blogs.length + 1
    let title = req.body.title
    let article = req.body.article
    
    if(!title){
        let error = new Error("You should include a title.")
        error.status = 400
        next(error)
    }

    let newArticle = {
        id: newId,
        title: title,
        article: article,
        date: currentDate()
    }
    blogs.push(newArticle)
    res.redirect('/home')
}

// PUT /edit/id
// edit blog
let updateArticle = (req, res, next) => {
    let id = req.params.id
    let newTitle = req.body.title
    let newArticle = req.body.article
    let articleToUpdate = blogs.find(article => article.id == id)

    if(!articleToUpdate) {
        let error = new Error(`article with id: ${id} not found.`)
        error.status = 404 
        next(error)
    }

    articleToUpdate.title = newTitle
    articleToUpdate.article = newArticle

    blogs.find(blog => blog.id == id)["title"] = newTitle
    blogs.find(blog => blog.id == id)["article"] = newArticle

    console.log(blogs)
    res.redirect('/home')
}

// DELETE /id
// delete a blog
let deleteArticle = (req, res, next) => {
    let id = req.params.id
    let articleToDelete = blogs.find(article => article.id == id)

    if(!articleToDelete) {
        let error = new Error(`article with id: ${id} not found.`)
        error.status = 404
        next(error)
    }

    let newBlogs = blogs.filter(article => article.id != id)
    if(newBlogs.length < blogs) {
        console.log("blog removed successfully.")
    }
    res.end()
}

// GET /edit/id
// editing blog form
let showEditForm = (req, res, next) => {
    let id = req.params.id
    let blogToEdit = blogs.find(blog => blog.id == id)

    if(!blogToEdit){
        let error = new Error(`Can't find blogs with id: ${id}`)
        error.status = 404
        next(error)
        return
    }

    res.render("./edit/index", {
        id: id,
        title: blogToEdit.title,
        article: blogToEdit.article
    })
}

export {getAllBlogs, getOneArticle, createArticle, updateArticle, deleteArticle, showEditForm}