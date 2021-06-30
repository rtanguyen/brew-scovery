async function deleteFormHandler(event) {
    event.preventDefault();

    const id = (($(this)[0].id).split(' ')[1]).replace('edit-','');


    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-review-btn').addEventListener('click', deleteFormHandler);