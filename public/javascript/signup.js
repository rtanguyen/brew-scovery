let image_url = "";

async function signupFormHandler(event) {
    event.preventDefault();

  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
          image_url
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      //check response status
      if (response.ok) {
        console.log(response);
        // document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dipwtij2r', 
  uploadPreset: 'miso-hungry'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
      image_url = result.info.secure_url
      console.log(image_url);

      // let profilePicture = $(`
      // <img style="margin-left:25px;" class="rounded-circle profilePic" src=${image_url} width="200" height="200" />
      // `).appendTo('#profile-picture')

      $('#profile-pic').attr('src', image_url);
      $('#browse-input').attr('placeholder', result.info.original_filename)
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);