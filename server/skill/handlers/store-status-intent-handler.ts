import { getRequestType, getIntentName, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { listAll } from '../../utils/listAll'
import { handleUnlinkedAccount } from './launch-request-handler'
import { Order, Orders, Me, Tokens } from 'ordercloud-javascript-sdk'

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
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken

    if (!accessToken) {
      return handleUnlinkedAccount(handlerInput)
    }

    try {
      await Me.Get({ accessToken })
    } catch {
      return handleUnlinkedAccount(handlerInput)
    }

    const timeframe =
      handlerInput.requestEnvelope.request.intent.slots.timeframe.value
    const days = Math.ceil(timeframe / (1000 * 3600 * 24))
    let totalMade = 0
    if (days > 365) {
      return handlerInput.responseBuilder
        .speak("I'm only able to find under a year's worth of orders, sorry!")
        .getResponse()
    }

    const orders = await listAll(
      Orders.List,
      'Incoming',
      null,
      { accessToken }
    )

    totalMade = getOrderTotal(orders, timeframe)

    const speakOutput = `Store sales for ${timeframe} is $${totalMade}`

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Ask for more earnings statistics if you'd like!")
      .getResponse()
  },
}

function getOrderTotal(orders: Order[], timeframe: any) {
  let subtotal = 0
  const acceptableDateRange: number = new Date(timeframe).getTime()
  let dateCreated: Date

  orders.forEach(function (order: Order) {
    if (order !== null && order !== undefined) {
      dateCreated = new Date(order.DateCreated || new Date())
      if (new Date(dateCreated).getTime() >= acceptableDateRange) {
        subtotal = +subtotal + +(order.Subtotal || 0)
      }
    }
  })
  return +subtotal.toFixed(2)
}
