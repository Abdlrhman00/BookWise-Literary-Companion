//const User = require('./Objects.js');
//export var user = new Object();
import {sessionInfo,userType} from './co.js';


document.getElementById('login-btn').addEventListener('click', function() {
  event.preventDefault();
  const email = document.getElementById('input-email').value;
  const password = document.getElementById('input-password').value;

  fetch('http://localhost:3000/log/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
    if(data.success){
     // user.userId=data.data[0].user_id;
     // user.firstName=data.data[0].first_name;
     //const user = new User(data.data[0].user_id,data.data[0].first_name);
      // console.log(user);
      // console.log(data.data);
      sessionInfo(data.data[0].user_id,data.data[0].first_name);
      const type = userType(data.data[0].first_name);
      window.location.href = '/home';
    }else{
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error during sign-in:', error);
  });
});

// function sessionInfo(userId,firstName){
//   document.cookie = "userId=" + userId + "; path=/";
//   document.cookie = "firstName=" + firstName + "; path=/";

//   console.log('done');
// }

// function deleteCookie(name) {
//   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// }
//module.exports = user;


// if (data.success) {
    //   if (document.getElementById('remember-check').checked) {
    //     // Set cookies based on remember checkbox
    //   }
    //   fetch(`http://localhost:3000/getInfo?email=${email}`)
    //   .then(response => response.json())
    //   .then(additionalInfo => {
    //     // Handle additional info and set cookies
    //     if (additionalInfo.userID === 'admin') {
    //       window.location.href = `../views/viewall-admin`;
    //     } else {
    //       window.location.href = `../views/home-user`;
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching additional info:', error);
    //   });
    // } else {
    //   // location.reload();
    //   alert('Enter valid Email and Password');
    // }
