listEl();

async function listEl() {
    let titleList_ul = document.querySelector("#blogsList");
    blogs = await getBlogs();
    let titleEl = blogs.map(
        (blog) =>
            `
            <div class="blog-entry-container">
                <li>${blog.title}</li>
                <div class="blog-actions">
                    <button id="edit_${blog.id}" onclick="editBtn_eventListener(${blog.id})">Edit</button>
                    <button id="delete_${blog.id}" onclick="deleteBtn_eventListener(${blog.id})">Delete</button>
                </div>
            </div>
            `
    );
    titleList_ul.innerHTML = titleEl.join("");
    async function getBlogs() {
        let res = await fetch("http://localhost:3000/api/home");
        let blogs = await res.json();
        return blogs;
    }
}

async function editBtn_eventListener(id) {
    window.location.href = `http://localhost:3000/edit/${parseInt(id)}`;
}

async function deleteBtn_eventListener(id) {
    await fetch(`http://localhost:3000/delete/${parseInt(id)}`, {
        method: "DELETE",
    });
    listEl();
}
