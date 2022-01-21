/**
 * get tasks api
 * returns an array of the tasks if succeeded
 * otherwise false
 */
 export default async function getUserInfo(token)
 {
     let response;
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Token "+token);
     
     var formdata = new FormData();
     
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: formdata,
       redirect: 'follow'
     };
     
     response = await fetch("https://i13hpc29.ira.uka.de:443/auth/userinfo/", requestOptions)
     
     if(response.status==200)
         return response.json()
     return false;
     
 }