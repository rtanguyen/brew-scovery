// var review_text;
// var user_id;
// //review id number
// var id;

// $('#staticBackdrop').on('show.bs.modal', function (event) {
//     var val = ($(event.relatedTarget)[0].id).split(' ')[0]
//     var review_text = $(event.relatedTarget)[0].value
//     user_id = (($(event.relatedTarget)[0].id).split(' ')[0]).replace('user-','')
//     id = (($(event.relatedTarget)[0].id).split(' ')[1]).replace('edit-','')
//     console.log(id);

//     $('#edit-post-content').text(review_text);
// });

async function editReviewHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    console.log(id);
    const review_text = document.querySelector('#edit-post-content').value;
    console.log(review_text);
  
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        review_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  console.log(response);
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editReviewHandler)