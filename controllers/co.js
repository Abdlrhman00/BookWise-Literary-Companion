export function sessionInfo(userId,firstName){
    document.cookie = "userId=" + userId + "; path=/";
    document.cookie = "firstName=" + firstName + "; path=/";
  
    console.log('done');
  }
  
  export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  export function getAllCookie(){
    var resArr=[];
    var splitArr=document.cookie.split(";");

    for (const i in splitArr) {
       resArr[splitArr[i].split("=")[0].trim()]=splitArr[i].split("=")[1];
    }
    return resArr;
}

export function userType(userName){
    let type = 'user'
    if(userName === 'admin')
        type = 'admin';

    return type;
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }

  console.log('deleting cookies..');
}

export function changeLike(){
  const likeBtn = document.getElementById('like-btn');

  likeBtn.style.backgroundColor = '#edc001'; // Change the color to red when clicked
  likeBtn.style.color = 'white';
}
// module.exports = {
//     sessionInfo,
//     deleteCookie,
//     getAllCookie,
//     userType
//   };