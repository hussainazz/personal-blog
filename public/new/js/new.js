let form = document.querySelector('#form')
let formSubmitBtn = document.querySelector('#new-article-btn')
formSubmitBtn.addEventListener("submit", submitNewBlog)

async function submitNewBlog(e) {
    e.preventDefault()
    console.log("here")
    let formData = new FormData(this)
    let title = formData.get("title")
    let article = formData.get("article")
    console.log(title)

    try {
        let res = await fetch("http://localhost:3000/new", {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({title, article})
        })
    }
    catch {
        throw new Error(`Can't add new blog.`)
    }
}