import { pino } from "pino";
import config from "../../config/config.js";

const isDevelopment = config.nodeEnv === "development";

export const logger = pino({
  level: config.logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,

  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
});
