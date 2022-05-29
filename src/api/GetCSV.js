import { MOCK_BACKEND, SERVER_URL } from "../constants";
import { getToken } from "../user/User";

export default async function getCSV() {

  let response;


  var myHeaders = new Headers();
  let token = getToken()
  myHeaders.append("Authorization", "Token "+token);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  response = await fetch(
    SERVER_URL + "/v1/getcsvlink/",
    requestOptions
  );
  if (response.status === 200) {
    let text = await response.text();
    if (text) return text;
    else return false;
  }
  return false;
}
