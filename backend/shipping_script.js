var sharedVariable = localStorage.getItem('cusid');
var sharedVariable1 = localStorage.getItem('orid');
  // Use the sharedVariable

function directFunction1(code, message){
    if(code == 1){
      alert(message);
      window.location.replace('D:/DatabaseLab/public/thank.html');
    }
    else if(code ==0){
      alert(message);
    } else {
      alert("Please wait");
    }
  }

document.getElementById('shipping-box').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get the input value
    var street_number = document.getElementById('street_number').value;
    var street_name = document.getElementById('street_name').value;
    var country = document.getElementById('shipping_country').value; 
    var country_id = document.getElementById('shipping_countryID').value;
    console.log(street_number);
    console.log(street_name);
    console.log(country);
    console.log(country_id);
    console.log(sharedVariable);
    console.log(sharedVariable1);
    fetch('http://localhost:3000/shipping', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            street_number: street_number,
            street_name: street_name,
            country: country,
            country_id: country_id,
            cus_id: sharedVariable,
            orid: sharedVariable1
        })
    }) 
    .then(response => response.json())
    .then(data => {
        directFunction1(data.code, data.message)
        localStorage.setItem('code', data.code);
    })
    .catch(error => {
        console.log('Error: ', error);
    })

});

function validateForm() {
  var x1 = document.forms["myForm"]["street_number"].value;
  var x2 = document.forms["myForm"]["street_name"].value;
  var x3 = document.forms["myForm"]["shipping_country"].value;
  var x4 = document.forms["myForm"]["shipping_countryID"].value;
  if(x1 == "" || x2 == "" || x3 == "" || x4 == "") {
      alert("Please fill in");
      return false
  } else {
      window.location.replace('../thank_you/thank.html')
  }
}

function logOut() {
  window.location.replace('D:/DatabaseLab/public/login.html')
}