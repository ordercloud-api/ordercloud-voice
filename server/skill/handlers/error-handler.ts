/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import e from 'express'

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
export default {
  canHandle(): boolean {
    return true
  },
  handle(handlerInput: HandlerInput, error: any): Response {
    const speakOutput =
      'Sorry, I had trouble doing what you asked. Please try again.'
    console.log(`~~~~ Error handled:`)
    if (typeof error === 'string') {
      console.log(error)
    } else {
      if (error.isOrderCloudError) {
        console.log(error.message)
        console.log(JSON.stringify(error.errors))
      } else {
        console.log(JSON.stringify(error))
      }
    }
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  },
}
