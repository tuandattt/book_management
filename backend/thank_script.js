var sharedVariable = localStorage.getItem('cusid');
console.log(sharedVariable);
var code = localStorage.getItem('code');
console.log(code);
localStorage.removeItem('orid');

function return_menu(code) {
  if (code == 1) {
    alert("Welcome back");
    window.location.replace('D:/DatabaseLab/public/menu.html');
  } else if (code == 0) {
    alert("Cannot identify your ID, please log in again");
    window.location.replace('D:/DatabaseLab/public/login.html');
  } else {
    alert("Please wait");
  }
}

function logOut() {
  window.location.replace('D:/DatabaseLab/public/login.html')
}

document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementsByClassName('backButton');
  console.log(button);
  console.log(button[0]);
  let logged = false;

  // Send data to backend
  button[0].addEventListener('click', async function(event) {
    //Get the input values of login form
    if (logged) {
      return;
    }

    logged = true;

    fetch('http://localhost:3000/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cus_id: sharedVariable })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orid', data.orid);
        console.log(data.orid);
        return_menu(code);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
