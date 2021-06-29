const edits = document.querySelectorAll('button.edit-review-btn')
    for(edit of edits) {
        edit.addEventListener('click', function(event){
            event.preventDefault();

            let userId = ($(this)[0].id).split(' ')[0];
            let postId = ($(this)[0].id).split(' ')[1];

    })
}