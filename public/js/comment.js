async function commentForm(event) {
    event.preventDefalt();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1 
    ];
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'Post',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'content-type': 'applications/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentForm);