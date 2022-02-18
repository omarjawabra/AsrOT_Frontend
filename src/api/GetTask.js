/**
 * get tasks api
 * returns an array of the tasks if succeeded
 * otherwise false
 */
 export default async function getTask(task_id)
 {
     let response;
     var myHeaders = new Headers();
     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };  
     response = await fetch("https://i13hpc29.ira.uka.de:443/v1/gettask/?taskId="+task_id, requestOptions);
     
     if(response.status==200)
         return response.json()
     return false;
     
 }