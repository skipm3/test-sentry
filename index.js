const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const test = require("./routes/test.js");

const app = express();

Sentry.init({
  dsn: "https://b279026002e847d6a0a18821bbe92190@o1079854.ingest.sentry.io/6085014",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use("/test", test);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(3000);
