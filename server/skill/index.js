const { ExpressAdapter } = require("ask-sdk-express-adapter");
const Alexa = require("ask-sdk-core");
const skillBuilder = Alexa.SkillBuilders.custom();

/**
 * Register handlers
 * order matters - handlers are processed top to bottom
 */
const handlers = [
  require("./handlers/launch-request-handler"),
  require("./handlers/hello-world-intent-handler"),
  require("./handlers/help-intent-handler"),
  require("./handlers/cancel-and-stop-intent-handler"),
  require("./handlers/fallback-intent-handler"),
  require("./handlers/session-ended-request-handler"),
  require("./handlers/intent-reflector-handler"),
];

const skill = skillBuilder
  .create()
  .addRequestHandlers(handlers)
  .addErrorHandler(require("./handlers/error-handler"));

const adapter = new ExpressAdapter(skill, false, false);
module.exports = adapter.getRequestHandlers();
