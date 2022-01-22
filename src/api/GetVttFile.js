export default async function getVttFile(token, id) {
  let response;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);
  var formdata = new FormData();
  formdata.append("taskId", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
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