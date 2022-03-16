import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockAssignTask(token, email, taskID) {
  return {};
}


export default async function assignTask(
  token,
  email, 
  taskID
) {
  if (MOCK_BACKEND) {
    return mockAssignTask(token, email, taskID);
  }
  let response;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);
    
  var formdata = new FormData();
  formdata.append("taskID", taskID);
  formdata.append("email", email);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect:'follow'
  };

  response = await fetch(
    SERVER_URL + "/v1/createtask/",
    requestOptions
  );

  if (response.status == 200) return response.json();
  return false;
}
