request = require('request');

var url = 'http://api.stage.justmeet.io/user/11/meetings';
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body)[0].name); // Print the next meeting
        nextMeeting = JSON.parse(body)[0].name;
        speechOutput = "You next meeting is " + response.name  + ", its agenda items are goto the pub";
        this.emit(':tell', speechOutput)
     }
})
