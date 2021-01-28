const Alexa = require('ask-sdk-core')

module.exports = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Hello World!";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Would you like to learn anything else?")
      .getResponse();
  },
};
