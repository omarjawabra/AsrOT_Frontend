export default async function getVttCorrection(taskId) {
  let response;
  var formdata = new FormData();
  formdata.append("taskId", taskId);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  response = await fetch(
    "https://i13hpc29.ira.uka.de:443/v1/getcorrectedvtt/",
    requestOptions
  );

  if (response.status == 200) {
    let x = await response.json();
    return x.vtt;
  }

  return false;
}