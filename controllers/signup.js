document.getElementById('signup-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('input-email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const password = document.getElementById('input-password').value;
    //const password2 = document.getElementById('input-password1').value;
  
    fetch('http://localhost:3000/log/singup', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email : email , first_name : firstName , last_name : lastName, password : password})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            // user.userId=data.data[0].user_id;
            // user.firstName=data.data[0].first_name;
            //const user = new User(data.data[0].user_id,data.data[0].first_name);
             // console.log(user);
             // console.log(data.data);
             //sessionInfo(data.data[0].user_id,data.data[0].first_name);
             //const type = userType(data.data[0].first_name);
             window.location.href = '/log/signin';
             alert(data.message);
           }else{
             alert(data.error);
           }
    })
    .catch(error => {
        console.error('Error during sign-up:', error);
      });
});

  
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
  