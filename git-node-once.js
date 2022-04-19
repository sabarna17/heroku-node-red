const { Octokit } = require("@octokit/core");
const axios = require('axios');
var base64 = require('base-64');
var content = [];
var cont;
var noOfFiles;
const octokit = new Octokit({
  auth: "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",
});


function function2() {  
  console.log('Git to Node Triggered');
  async function getData() {
    const {
      data
    } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'sabarna17',
      repo: 'heroku-node-red',
      path: 'node-flows.json'
    });
    cont = base64.decode(data.content);
    // console.log(cont);
    
    axios.post('https://sheltered-harbor-46598.herokuapp.com/flows', cont, 
            // { auth: { username: 'UserName', password: 'PassWord' } },
            { headers: { 'Content-Type': 'application/json', 'Node-RED-Deployment-Type': 'full' } })
          .then(res => { console.log(`DATA Pulled from Git | statusCode: ${res.status}`) })
          .catch(error => { console.error('error') });
  }
  
  getData();
}
setTimeout(function2, 40000);