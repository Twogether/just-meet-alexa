'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'justmeet';  // TODO replace with your app ID (OPTIONAL).
var request = require('request');

module.exports.justmeet = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetMeeting');
    },
    'GetNextMeetingIntent': function () {
        this.emit('GetMeeting');
    },
    'GetMeeting': function () {
        getNextMeeting(this, '11', function(nextMeeting, alexaApp) {
          var speechOutput = "You next meeting is " + nextMeeting  + ", its agenda items are goto the pub";
          alexaApp.emit(':tell', speechOutput);
        });
        
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Why do you need any help? You should already be running to your next meeting";
        var reprompt = "Honestly, you should start running already";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Ok, good luck in your next meeting");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "See you later aligator");
    }
};


function getNextMeeting(alexaApp, user, callback) {
    // ok this needs refactoring - of course
  var url = 'http://api.stage.justmeet.io/user/11/meetings';
  request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          //console.log(JSON.parse(body)[0].name); // Print the next meeting
          var nextMeeting = JSON.parse(body)[0].name;
          return callback(nextMeeting, alexaApp);
       } else {
          return false;
       }
  })
}