import { getRequestType, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput = 'Hello, testing testing! Goodbye'

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        // .reprompt(speakOutput)
        .getResponse()
    )
  },
}
