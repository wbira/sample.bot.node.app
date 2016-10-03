var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hello, what is your name?')
    },
    function (session, results) {
        session.send('Hello, %s nice to meet you', results.response)
    }
]);

