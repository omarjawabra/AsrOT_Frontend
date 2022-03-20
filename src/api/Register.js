import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockRegister(email, password) {
  return {"user": {"email": email}};
}

/**
 * register api
 * returns true  if register succeeded
 * returns false if not
 */
 export default async function register(email,password)
 {
    if (MOCK_BACKEND) {
      return mockRegister(email, password);
    }
     let response;
     var formdata = new FormData();
     formdata.append("email", email);
     formdata.append("password", password);
     
     var requestOptions = {
       method: 'POST',
       body: formdata,
       redirect: 'follow'
     };
     
     response = await fetch(SERVER_URL + "/auth/register/", requestOptions);
 
     if(response.status === 201)
         return true
     return false;
     
 }