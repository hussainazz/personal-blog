import express from "express"
import blogs from "../blogs/blogs.js"
import path from "node:path"
import { fileURLToPath } from 'url'
import { copyFileSync } from "node:fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

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
    let article = blogs.find(article => article.id == id)

    if(!article) {
        let error = new Error(`article with id: ${id} not found.`)
        error.status = 404 
        next(error)
    }
    res.status(200).json(article)
    res.end()
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

    res.end()
}

// PUT /edit/id
// edit article
let updateArticle = (req, res, next) => {
    let id = req.params.id
    let newTitle = req.body.title
    let newArticle = req.body.article
    let articleToUpdate = blogs.find(article => article.id == id)

    if(!article) {
        let error = new Error(`article with id: ${id} not found.`)
        error.status = 404 
        next(error)
    }

    if (articleToUpdate) {
        articleToUpdate.title = newTitle
        articleToUpdate.article = newArticle
    }

    res.end()
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

export {getAllBlogs, getOneArticle, createArticle, updateArticle, deleteArticle}