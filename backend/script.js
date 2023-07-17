document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log("Username: " + username);
    console.log("Password: " + password);
  
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
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
          console.error('Error:', error);
        });
  
    // Perform other actions or send the data to the server using fetch()
  });