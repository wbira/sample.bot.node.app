var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();

bot.dialog('/', intents);

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok, Changed your name to %s', session.userData.name)
    }
]);

intents.onDefault([
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

