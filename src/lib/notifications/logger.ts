import type { OmitFirst } from "@/types/utility";
import { type PrintOption, print } from "./print";

type LoggerParameters = OmitFirst<Parameters<typeof print>>;
type Logger = Record<PrintOption, (...params: LoggerParameters) => void>

function createLogger(): Logger {
  return {
    debug: print.bind(null, "debug"),
    info: print.bind(null, "info"),
    warn: print.bind(null, "warn"),
    error: print.bind(null, "error"),
    trace: print.bind(null, "trace"),
  };
}

export const logger = createLogger();
