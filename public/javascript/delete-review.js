async function deleteFormHandler(event) {
    event.preventDefault();

//     const id = (($(this)[0].id).split(' ')[1]).replace('edit-','');
// console.log(id);
const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
];
    
    const response = await fetch(`/api/reviews/${id}`, {
       method: 'DELETE' 
        });
    
    
    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-review-btn').addEventListener('click', deleteFormHandler);