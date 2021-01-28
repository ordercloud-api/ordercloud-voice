import { getRequestType, getIntentName, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { listAll } from '../../utils/listAll'
import { Order, Orders } from 'ordercloud-javascript-sdk'

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
