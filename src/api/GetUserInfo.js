import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetUserInfo(token) {
  return {"email": "max@mustermann.de", "restricted": false, "canMakeAssignments": true};
}

/**
 * get tasks api
 * returns an array of the tasks if succeeded
 * otherwise false
 */
 export default async function getUserInfo(token)
 {
     if (MOCK_BACKEND) {
       return mockGetUserInfo(token);
     }
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
     
     response = await fetch(SERVER_URL + "/auth/userinfo/", requestOptions)
     
     if(response.status === 200)
         return response.json()
     return false;
     
 }