import { execa } from 'execa';
import { logCommand, logError, settings } from './logger.js';

export async function runCommand(command: string, args: string[] = [], options: { failOnError?: boolean } = {}): Promise<string | null> {
  const { failOnError = true } = options;
  const cmdStr = `${command} ${args.join(' ')}`;
  logCommand(cmdStr);

  if (settings.dryRun) return '';

  try {
    const { stdout } = await execa(command, args, { stdio: 'inherit' });
    return stdout;
  } catch (err: any) {
    logError(`Errore eseguendo comando ${cmdStr}: ${err.message}`);
    if (failOnError) throw err;
    return null;
  }
}
