import { getRequestType, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput =
      'Welcome, you can say "Earnings for today" or Help. Which would you like to try?'

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  },
}
