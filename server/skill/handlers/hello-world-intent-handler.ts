import Alexa, { HandlerInput } from 'ask-sdk-core';

export default {
  canHandle(handlerInput: HandlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "Hello World!";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Would you like to learn anything else?")
      .getResponse();
  },
};
