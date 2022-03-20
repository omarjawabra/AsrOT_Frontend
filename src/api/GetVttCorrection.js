import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetVttCorrection(taskId) {
  let vtt = "WEBVTT\n\nNOTE task_id: 344c770c-c12c-4075-903d-7d0547b3b45d\n\n00:00:00.000 --> 00:00:11.580\n";
  vtt += "this is a corrected transcript of a test sound file in which i speak a couple of words <unk> i also include a next sentence in hope that it will create a new paragraph\n\n";
  vtt += "00:00:13.290 --> 00:00:14.730\nand for completeness\n\n00:00:14.730 --> 00:00:16.410\nhere is a third sentence";
  return vtt;
}


export default async function getVttCorrection(taskId) {
  if (MOCK_BACKEND) {
    return mockGetVttCorrection(taskId);
  }
  let response;
  var formdata = new FormData();
  formdata.append("taskId", taskId);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  response = await fetch(
    SERVER_URL + "/v1/getcorrectedvtt/",
    requestOptions
  );

  if (response.status === 200) {
    let x = await response.json();
    return x.vtt;
  }

  return false;
}