let user_image = "";

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
          user_image
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      //check response status
      if (response.ok) {
        console.log('woohoo');
        document.location.replace('/');
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
      user_image = result.info.secure_url
      console.log(user_image);

      // let profilePicture = $(`
      // <img style="margin-left:25px;" class="rounded-circle profilePic" src=${image_url} width="200" height="200" />
      // `).appendTo('#profile-picture')

      $('#profile-pic').attr('src', user_image);
      $('#browse-input').attr('placeholder', result.info.original_filename)
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);