var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session, arg, nextStep) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            nextStep();
        }
    }, function (session) {
        session.send('Hello %s !', session.userData.name);
    }]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hello, what is your name?')
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

