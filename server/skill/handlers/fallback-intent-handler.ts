import { getRequestType, getIntentName, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
    )
  },
  handle(handlerInput: HandlerInput): Response {
    const speakOutput = "Sorry, I don't know about that. Please try again."

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  },
}
