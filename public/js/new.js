//new post code
const { json } = require("sequelize/types");
//async waiting 
const newFormHandler = async function(event){
    event.preventDefault();
    const title = document.querySelector('input [name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    await fetch(`/api/post`, {
        method: "POST",
        body: json.stringify({
            title, body
        }),
        headers: {
            "content-type": "application/json"
        }
    });

    document.location.replace("/dashboard")
}

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler)