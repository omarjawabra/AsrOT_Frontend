import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockLogin(email, password) {
  return {"token": "5e79248ef14260a8e67c1846dea5855e8361de1e"};
}

/**
 * log in api
 * returns the token if login succeed
 * returns false if login failed
 */
export default async function login(email,password)
{
    if (MOCK_BACKEND) {
      return mockLogin(email, password);
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
    
    response = await fetch(SERVER_URL + "/auth/login/", requestOptions);

    if(response.status === 200)
        return response.json()
    return false;
    
}