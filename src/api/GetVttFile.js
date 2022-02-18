/**
 * 
 * @param {the token of the logged in user} token 
 * @param {the task_id of the file} id 
 * @returns the vtt text if succeeded, otherwise false
 */

export default async function getVttFile(id) {
  let response;
  var formdata = new FormData();
  formdata.append("taskId", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  response = await fetch(
    "https://i13hpc29.ira.uka.de:443/v1/getvtt/",
    requestOptions
  );

  if (response.status == 200) {
    let x = await response.json();
    return x.vtt;
  }

  return false;
}