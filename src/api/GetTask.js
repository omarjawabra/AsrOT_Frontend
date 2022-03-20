import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetTask(task_id) {
  return {"tasks": {
    "task_id": task_id,
    "file_size": 3046552,
    "task_name": "MyTask",
    "audio_filename": "3sentences-2022_03_16_15_23_11",
    "date_time": "2022-03-16T14:23:11.622659Z",
    "language": "en",
    "correction": false,
    "status": "done"
  }}
}

/**
 * get tasks api
 * returns an array of the tasks if succeeded
 * otherwise false
 */
 export default async function getTask(task_id)
 {
     if (MOCK_BACKEND) {
       return mockGetTask(task_id);
     }
     let response;
     var myHeaders = new Headers();
     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };  
     response = await fetch(SERVER_URL + "/v1/gettask/?taskId="+task_id, requestOptions);
     
     if(response.status === 200)
         return response.json()
     return false;
     
 }