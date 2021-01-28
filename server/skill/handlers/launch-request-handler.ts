import { getRequestType, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { Me } from 'ordercloud-javascript-sdk'

export const handleUnlinkedAccount = (handlerInput: HandlerInput): Response  => {
  return handlerInput.responseBuilder
    .speak('Sorry, it looks like your account was not properly linked. Please use the Alexa app to link your account.')
    .withLinkAccountCard()
    .getResponse()
}

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    const accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;

    if (!accessToken) {
      return handleUnlinkedAccount(handlerInput);
    }

    try {
      const currentUser = await Me.Get({accessToken})
      const speakOutput =
        `Welcome ${currentUser.FirstName} ${currentUser.LastName}, you can say "Earnings for today" or Help. Which would you like to try?`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse()
    } catch {
      return handleUnlinkedAccount(handlerInput);
    }
  },
}
