
name()
async function name() {
    
    let res = await fetch("http://localhost:3000/api/home")
    let blogs = await res.json()
    
    let blogsList = document.querySelector("#blogs-list")
    
    blogs.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.title;
        blogsList.appendChild(li);
    });
}