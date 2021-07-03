async function loginFormHandler(event) {
  console.log('plz')  
  event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      console.log(username)
      console.log(password)
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
        
      } else {
        alert(response.statusText);
      console.log('hello')
      }
    }

  };

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);


var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
