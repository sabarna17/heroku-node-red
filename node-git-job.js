const { Octokit } = require("@octokit/core");

const axios = require('axios');
var base64 = require('base-64');
var flowsContent;
var sha;
const octokit = new Octokit({
    auth: "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",
});

function function2() {
    // all the stuff you want to happen after that pause
    console.log('Node to Git Triggered');


    async function getData() {
        axios
            .get('https://noderedonsapbtp.cfapps.us10.hana.ondemand.com/flows',
                {
                    // auth: {
                    //     username: 'UserName',
                    //     password: 'PassWord'
                    // }
                }
                )
            .then(res => {
                flowsContent = base64.encode(JSON.stringify(res.data));
                getSha();
            })
            .catch(error => {
                console.error(error)
            });
    }
    async function getSha() {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'sabarna17',
            repo: 'heroku-node-red',
            path: 'node-flows.json'
        });
        sha = data.sha;
        pushToGit();
    }
    async function pushToGit() {
        if (flowsContent) {
            const { data } = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: 'sabarna17',
                repo: 'heroku-node-red',
                path: 'node-flows.json',
                sha: sha,
                message: 'Node-RED Flows',
                content: flowsContent
            });
            console.log('Flows pushed to Git');
        }
    }
    setInterval(() => getData(), 30000);

}
// call the rest of the code and have it execute after 3 seconds
setTimeout(function2, 90000);