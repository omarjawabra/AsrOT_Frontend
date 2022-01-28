export default async function createTask(
  token,
  file,
  taskName,
  sourceLanguage
) {
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
    "https://i13hpc29.ira.uka.de:443/v1/createtask/",
    requestOptions
  );

  if (response.status == 200) return response.json();
  return false;
}
