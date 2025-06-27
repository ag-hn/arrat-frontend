import { env } from "@/env";

const checkIfLogsEnabled = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (env.NODE_ENV === 'production') {
    return false;
  }

  const search = window?.location?.search;
  const enabled = search && new URLSearchParams(search).get("debug") === "true";

  LOGGING_ENABLED = enabled || false;
  return LOGGING_ENABLED;
};

const IS_DEV = false//process.env.NODE_ENV !== "production";
let LOGGING_ENABLED: boolean | undefined = undefined;

const printOptions = ["info", "warn", "error", "trace", "debug"] as const;
export type PrintOption = (typeof printOptions)[number];
const printMap = {
  info: {
    func: console.info,
    message: ["%c Log:", "background: blue; color: white;"],
  },
  warn: {
    func: console.warn,
    message: ["%c Log:", "background: orange; color: white;"],
  },
  error: {
    func: console.error,
    message: ["%c Log:", "background: red; color: white;"],
  },
  trace: {
    func: console.trace,
    message: ["%c Log:", "background: grey; color: black;"],
  },
  debug: {
    func: console.debug,
    message: ["%c Log:", "background: green; color: white;"],
  },
} as const satisfies Record<
  PrintOption,
  { func: (...messages: unknown[]) => void; message: string[] | string }
>;

export const print = (option: PrintOption, ...messages: unknown[]) => {
  if (typeof LOGGING_ENABLED === "undefined") {
    checkIfLogsEnabled();
  }

  if (IS_DEV || LOGGING_ENABLED) {
    const match = printMap[option];
    match.func(...match.message, ...messages);
  }
};
