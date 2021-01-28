import { HandlerInput, getRequestType, getIntentName } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    )
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput = 'You can say hello to me! How can I help?'

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  },
}
