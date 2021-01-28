import Alexa, { HandlerInput } from 'ask-sdk-core';

export default {
  canHandle(handlerInput: HandlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput =
      'Hello, testing testing! Goodbye';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // .reprompt(speakOutput)
      .getResponse();
  },
};
