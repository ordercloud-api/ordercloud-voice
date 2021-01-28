import { getRequestType, HandlerInput, getIntentName } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
        getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
    )
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput = 'Goodbye!'

    return handlerInput.responseBuilder.speak(speakOutput).getResponse()
  },
}
