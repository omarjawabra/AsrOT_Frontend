/**
 * get tasks api
 * returns an array of the tasks if succeeded
 * otherwise false
 */
 export default async function getTaskList(token)
 {
     let response;
     var myHeaders = new Headers();
     console.log("Token "+token)
     myHeaders.append("Authorization", "Token "+token);

     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };  
     response = await fetch("https://i13hpc29.ira.uka.de:443/v1/gettasks/", requestOptions);
     
     if(response.status==200)
         return response.json()
     return false;
     
 }