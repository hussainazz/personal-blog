let blogsList = document.querySelector("#blogs-list")

name()
async function name() {
    
    let res = await fetch("http://localhost:3000/home", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
        body
    })
    let final = await res.json()

    console.log(final[0])
}