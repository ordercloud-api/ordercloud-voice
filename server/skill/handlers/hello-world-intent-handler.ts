import { getRequestType, getIntentName, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent'
    )
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput = 'Hello World!'

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt('Would you like to learn anything else?')
      .getResponse()
  },
}
