/**
 * 
 * @param {the token of the logged in user} token 
 * @param {the task_id of the file} task_id 
 * @returns the text if succeeded, otherwise false
 */
export default async function getTextFile(token, task_id) {
  let response;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);

  var formdata = new FormData();
  formdata.append("taskId", task_id);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: formdata,
  };
  response = await fetch(
    "https://i13hpc29.ira.uka.de:443/v1/gettext/",
    requestOptions
  );
  if (response.status == 200) {
    let text = await response.json();
    if (text.text) return text.text;
    else return false;
  }
  return false;
}
