import { ExpressAdapter } from 'ask-sdk-express-adapter'
import { SkillBuilders } from 'ask-sdk-core'
import LaunchRequestHandler from './handlers/launch-request-handler'
import HelloWorldIntentHandler from './handlers/hello-world-intent-handler'
import HelpIntentHandler from './handlers/help-intent-handler'
import CancelAndStopIntentHandler from './handlers/cancel-and-stop-intent-handler'
import FallbackIntentHandler from './handlers/fallback-intent-handler'
import SessionEndedRequestHandler from './handlers/session-ended-request-handler'
import IntentReflectorHandler from './handlers/intent-reflector-handler'
import ErrorHandler from './handlers/error-handler'

/**
 * Register handlers
 * order matters - handlers are processed top to bottom
 */
const handlers = [
  LaunchRequestHandler,
  HelloWorldIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  FallbackIntentHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler,
]
const skill = SkillBuilders.custom()
  .addRequestHandlers(...handlers)
  .addErrorHandlers(ErrorHandler)
  .create()

const adapter = new ExpressAdapter(skill, false, false)
export default adapter.getRequestHandlers()
