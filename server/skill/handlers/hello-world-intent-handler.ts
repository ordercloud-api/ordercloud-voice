import { getRequestType, getIntentName, HandlerInput } from 'ask-sdk-core';

export default {
  canHandle(handlerInput: HandlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
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
