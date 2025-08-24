type LoggerSettings = {
  verbose: boolean;
  dryRun: boolean;
};

let settings: LoggerSettings = {
  verbose: true,
  dryRun: false
};

export function init(options: Partial<LoggerSettings> = {}) {
  settings = { ...settings, ...options };
}

export function logInfo(msg: string) {
  if (settings.verbose) console.log(`✔ ${msg}`);
}

export function logError(msg: string) {
  console.error(`❌ ${msg}`);
}

export function logCommand(msg: string) {
  if (settings.verbose) console.log(`▶ ${msg}`);
}

export { settings };
