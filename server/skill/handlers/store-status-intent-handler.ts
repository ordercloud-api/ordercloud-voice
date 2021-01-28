import { getRequestType, getIntentName, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { listAll } from '../../utils/listAll'
import { Order, Orders, Tokens } from 'ordercloud-javascript-sdk'

// TODO: grab this from linked account
Tokens.SetAccessToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3IiOiJhYmlzaG9wYWRtaW4iLCJjaWQiOiJjMWQ5MmM0My1jN2FmLTQ2N2ItYjNkZi1kNDc1MWQ3MGNhZTYiLCJ1IjoiMzA3ODA0MSIsInVzcnR5cGUiOiJhZG1pbiIsInJvbGUiOlsiQXBpQ2xpZW50QWRtaW4iLCJBZG1pbkFkZHJlc3NSZWFkZXIiLCJBZGRyZXNzUmVhZGVyIiwiTWVBZG1pbiIsIkJ1eWVyVXNlckFkbWluIiwiVXNlckdyb3VwQWRtaW4iLCJNZVhwQWRtaW4iLCJQcm9kdWN0QWRtaW4iLCJQcmljZVNjaGVkdWxlQWRtaW4iLCJTdXBwbGllclJlYWRlciIsIlN1cHBsaWVyQWRkcmVzc1JlYWRlciIsIkJ1eWVyQWRtaW4iLCJPcmRlckFkbWluIiwiQnV5ZXJJbXBlcnNvbmF0aW9uIiwiQWRkcmVzc0FkbWluIiwiQ2F0ZWdvcnlBZG1pbiIsIkNhdGFsb2dBZG1pbiIsIlByb21vdGlvbkFkbWluIiwiQXBwcm92YWxSdWxlQWRtaW4iLCJDcmVkaXRDYXJkQWRtaW4iLCJTdXBwbGllckFkbWluIiwiU3VwcGxpZXJVc2VyQWRtaW4iLCJTdXBwbGllclVzZXJHcm91cEFkbWluIiwiU3VwcGxpZXJBZGRyZXNzQWRtaW4iLCJBZG1pblVzZXJBZG1pbiIsIlByb2R1Y3RGYWNldEFkbWluIiwiUHJvZHVjdEZhY2V0UmVhZGVyIiwiU2hpcG1lbnRBZG1pbiIsIkFzc2V0QWRtaW4iLCJEb2N1bWVudEFkbWluIiwiU2NoZW1hQWRtaW4iLCJNUFByb2R1Y3RBZG1pbiIsIk1QUHJvbW90aW9uQWRtaW4iLCJNUENhdGVnb3J5QWRtaW4iLCJNUE9yZGVyQWRtaW4iLCJNUFNoaXBtZW50QWRtaW4iLCJNUEJ1eWVyQWRtaW4iLCJNUFNlbGxlckFkbWluIiwiTVBSZXBvcnRSZWFkZXIiLCJNUFJlcG9ydEFkbWluIiwiTVBTdXBwbGllckFkbWluIiwiTVBTdXBwbGllclVzZXJHcm91cEFkbWluIiwiTVBTdG9yZWZyb250QWRtaW4iXSwibmJmIjoxNjExODQ3MTEwLCJleHAiOjE2MTE4ODM3MTAsImlhdCI6MTYxMTg0NzcxMCwiaXNzIjoiaHR0cHM6Ly9zdGFnaW5nYXV0aC5vcmRlcmNsb3VkLmlvIiwiYXVkIjoiaHR0cHM6Ly9zdGFnaW5nYXBpLm9yZGVyY2xvdWQuaW8ifQ.lbcsSCFMHdja7C7Cmsn3lWuoBZDD_MLt44VyN8fCCE4'
)
type StoreStatusHandlerInput = HandlerInput & {
  requestEnvelope: {
    request: {
      intent: {
        slots: {
          timeframe: {
            value: number
          }
        }
      }
    }
  }
}

export default {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'StoreStatusIntent'
    )
  },
  async handle(handlerInput: StoreStatusHandlerInput): Promise<Response> {
    const timeframe =
      handlerInput.requestEnvelope.request.intent.slots.timeframe.value
    // const dateDiff = new Date(timeframe) - new Date() // TODO: this doesn't seem right :shrugs:
    // const days = Math.ceil(dateDiff / (1000 * 3600 * 24))
    const days = 20 // TODO: actually calc
    let totalMade = 0

    if (days > 365) {
      return handlerInput.responseBuilder
        .speak("I'm only able to find under a year's worth of orders, sorry!")
        .getResponse()
    }

    const orders = await listAll(Orders.List, 'Incoming', {
      buyerID: '0005',
    })

    totalMade = getOrderTotal(orders, timeframe)

    const speakOutput = `Store sales for ${timeframe} is $${totalMade}`

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(
        'add a reprompt if you want to keep the session open for the user to respond'
      )
      .getResponse()
  },
}

function getOrderTotal(orders: Order[], timeframe: number): number {
  return 32
  // TODO: finish implementing
  // let subtotal = 0
  // const acceptableDateRange = new Date(timeframe) - new Date()
  // orders.forEach(function (order) {
  //   if (
  //     new Date(order.DateCreated!).getTime() >=
  //     new Date(acceptableDateRange).getTime()
  //   ) {
  //     subtotal = +subtotal + +order.Subtotal
  //   } else {
  //     // TODO
  //   }
  // })
  // return subtotal
}
