export default async function getMediaFile(task_id,name) {
let response;

var formdata = new FormData();
formdata.append("taskId", task_id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

response = fetch("https://i13hpc29.ira.uka.de:443/v1/getmedia/", requestOptions)
  .then(response => response.blob().then(blob => {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click()}))
  .catch(error => console.log('error', error));
  }
  