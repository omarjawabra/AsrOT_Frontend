import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockCreateTask(token, file, taskName, sourceLanguage) {
  return {"taskId": "51c77e4f-4222-4e59-95f4-139f25c57e8d"};
}

/**
 * 
 * @param {the token of the logged in user} token 
 * @param {the audio file to upload} file 
 * @param {the name of the task to create} taskName 
 * @param {the language of the audio} sourceLanguage 
 * @returns the response from the server if succeeded, otherwise returns false
 */

export default async function createTask(
  token,
  file,
  taskName,
  sourceLanguage
) {
  if (MOCK_BACKEND) {
    return mockCreateTask(token, file, taskName, sourceLanguage);
  }
  let response;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);
    
  var formdata = new FormData();
  formdata.append("audioFile", file.current.files[0]);
  formdata.append("taskName", taskName);
  formdata.append("sourceLanguage", sourceLanguage);

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

  if (response.status === 200) return response.json();
  return false;
}
