import { getRequestType, HandlerInput, getIntentName } from 'ask-sdk-core';

export default {
  canHandle(handlerInput: HandlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.StopIntent")
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "Goodbye!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
