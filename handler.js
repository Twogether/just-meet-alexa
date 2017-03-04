'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'justmeet';  // TODO replace with your app ID (OPTIONAL).


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
        var speechOutput = "You next meeting is Fire Entire Team, its agenda items are fire everyone, goto the pub";
        this.emit(':tell', speechOutput)
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