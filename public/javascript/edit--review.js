var review_text;
var user_id;
//review id number
var id;

$('#staticBackdrop').on('show.bs.modal', function (event) {
    var val = ($(event.relatedTarget)[0].id).split(' ')[0]
    var review_text = $(event.relatedTarget)[0].value
    user_id = (($(event.relatedTarget)[0].id).split(' ')[0]).replace('user-','')
    id = (($(event.relatedTarget)[0].id).split(' ')[1]).replace('edit-','')
    
    $('#edit-post-content').text(review_text);
});

async function editReviewHandler(event) {
    event.preventDvefault();
  
    console.log(user_id);
    console.log(review_id);
    
    const review_text = document.querySelector('#edit-post-content').value;
    console.log(review_text);
  
    const response = await fetch(`/api/reviews/:id`, {
      method: 'PUT',
      body: JSON.stringify({
        review_text,
        id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('button[name="save-btn-modal"]').addEventListener('click', editReviewHandler)