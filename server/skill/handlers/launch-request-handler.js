module.exports = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'Hello, testing testing! Goodbye';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // .reprompt(speakOutput)
      .getResponse();
  },
};
