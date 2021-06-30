async function deleteFormHandler(event) {
    event.preventDefault();

    const id = (($(this)[0].id).split(' ')[1]).replace('edit-','');
console.log(id);
    
    const response = await fetch(`/api/reviews/${id}`, {
    });
    method: 'DELETE'
    
    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', deleteFormHandler);