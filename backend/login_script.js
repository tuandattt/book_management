var modal1 = document.getElementById('id01');
var modal2 = document.getElementById('id02');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    } 
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// Check the matching of password
// Check the matching of password
var checkPsw = function() {
  if(document.getElementById('psw').value == document.getElementById('confirm-password').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'MATCHING';
  } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'NOT MATCHING';
  }
}


// Direct to main web
function directFunction(code, message){
  if(code == 1){
    alert(message);
    window.location.replace('D:/DatabaseLab/public/menu.html');
  }
  else if(code ==0){
    alert(message);
  } else {
    alert("Please wait");
  }
}
let id;
let logged = false;
// Send data to backend
document.getElementById('login-form').addEventListener('submit',async function(event) {
    event.preventDefault();
    //Get the input values of login form
    if(logged){
        return;
    }
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log("Username: " + username);
    console.log("Password: " + password);
    logged = true;
  
    fetch('http://localhost:3000/signedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(response => response.json())
        .then(data => {
          id = data.ID;
          console.log(data.orid);
          localStorage.setItem('cusid', id);
          localStorage.setItem('orid', data.orid);
          directFunction(data.code, data.message);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
    // Perform other actions or send the data to the server using fetch()
});



let registered = false;

function sendData(event) {
    event.preventDefault();
    if (registered) {
        return;
    }
    //Get the input values of login form
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value
    const password1 = document.getElementById('psw').value;

    console.log('Received signup request:', firstname, lastname, email, phone, password1);
    registered = true;
    // Create data
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname: firstname, lastname: lastname, email: email, phone: phone, password1: password1})
    })
    .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Login successful
            alert(data.message);
            // Redirect to another page or perform any other actions
          } else {
            // Login failed
            alert(data.message);
          }
        })
        .catch(error => {
        });

}

document.getElementById('register-form').addEventListener('submit', sendData)  



