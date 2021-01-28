import { getRequestType, HandlerInput } from 'ask-sdk-core';

export default {
  canHandle(handlerInput: HandlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
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
