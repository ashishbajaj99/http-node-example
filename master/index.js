const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

var pendingRequests = [];

rl.on('line', function(cmd) {
        switch (cmd) {
        case "start":
            handleStart();
            break;
        case "stop":
            handleStop();
            break;
        case "home":
            handleHome();
            break;
        case "exit":
            handleExit();
            break;
        default:
            console.log("unknown command: " + cmd);
            break;
        };
    });

const handleExit = function handleExit() {
    var r;
    //abort all pending requests
    while(pendingRequests.length) {
        r = pendingRequests.pop();
        r.abort();
    }
    rl.close();
};

const handleHome = function handleHome() {
    var r = request('http://10.0.1.5:3000', function (error, response, body) {
            var index = pendingRequests.indexOf(r);
            if(index < 0) {
                console.log("Fatal Error: request not found in pendingRequests Array"); //this should never happen
                process.exit(1);
            } else {
                pendingRequests.splice(index, 1);
            }

            if (error) {
                console.log(error);
            }

            if (!error && response.statusCode == 200) {
                console.log(body) // Print the response
            }
        });
    pendingRequests.push(r);
};

const handleStart = function handleStart() {
    var r = request('http://10.0.1.5:3000/start', function (error, response, body) {
            var index = pendingRequests.indexOf(r);
            if(index < 0) {
                console.log("Fatal Error: request not found in pendingRequests Array"); //this should never happen
                process.exit(1);
            } else {
                pendingRequests.splice(index, 1);
            }

            if (error) {
                console.log(error);
            }

            if (!error && response.statusCode == 200) {
                console.log(body) // Print the response
            }
        });
    pendingRequests.push(r);
};

const handleStop = function handleStop() {
    var r = request('http://10.0.1.5:3000/stop', function (error, response, body) {
            var index = pendingRequests.indexOf(r);
            if(index < 0) {
                console.log("Fatal Error: request not found in pendingRequests Array"); //this should never happen
                process.exit(1);
            } else {
                pendingRequests.splice(index, 1);
            }

            if (error) {
                console.log(error);
            }

            if (!error && response.statusCode == 200) {
                console.log(body) // Print the response
            }
        });
    pendingRequests.push(r);
};
