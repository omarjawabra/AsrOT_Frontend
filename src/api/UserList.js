import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetUserList(token) {
  return [
      {"email": "max@msutermann.de"},
      {"email": "maike@mustermann.de"}
  ];
}

 export default async function getUserList(token)
 {
     if (MOCK_BACKEND) {
       return mockGetUserList(token);
     }
     let response;
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Token "+token);
    
     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };

     // TODO add query
     
     response = await fetch(SERVER_URL + "/auth/listusers/", requestOptions)
     
     if(response.status === 200)
         return response.json()
     return false;
     
 }