import fs from 'fs/promises';
import path from 'path';
import { logInfo, logError, settings } from './logger.js';

export async function ensureDir(dirPath: string): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] mkdir ${dirPath}`);
    await fs.mkdir(dirPath, { recursive: true });
    logInfo(`Directory creata: ${dirPath}`);
  } catch (err: any) {
    logError(`Errore creando directory ${dirPath}: ${err.message}`);
    throw err;
  }
}

export async function removeDir(dirPath: string): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] rm -rf ${dirPath}`);
    await fs.rm(dirPath, { recursive: true, force: true });
    logInfo(`Directory rimossa: ${dirPath}`);
  } catch (err: any) {
    logError(`Errore rimuovendo directory ${dirPath}: ${err.message}`);
    throw err;
  }
}

export async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (err: any) {
    logError(`Errore leggendo file ${filePath}: ${err.message}`);
    throw err;
  }
}

export async function writeFile(filePath: string, data: string): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] write ${filePath}`);
    await fs.writeFile(filePath, data);
    logInfo(`File scritto: ${filePath}`);
  } catch (err: any) {
    logError(`Errore scrivendo file ${filePath}: ${err.message}`);
    throw err;
  }
}

export async function appendFile(filePath: string, data: string): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] append ${filePath}`);
    await fs.appendFile(filePath, data);
  } catch (err: any) {
    logError(`Errore appendendo a ${filePath}: ${err.message}`);
    throw err;
  }
}

export async function copyFile(src: string, dest: string): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] cp ${src} ${dest}`);
    await fs.copyFile(src, dest);
    logInfo(`Copiato ${src} → ${dest}`);
  } catch (err: any) {
    logError(`Errore copiando ${src}: ${err.message}`);
    throw err;
  }
}

export async function moveFile(src: string, dest: string): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] mv ${src} ${dest}`);
    await fs.rename(src, dest);
    logInfo(`Spostato ${src} → ${dest}`);
  } catch (err: any) {
    logError(`Errore spostando ${src}: ${err.message}`);
    throw err;
  }
}

export async function mergeFiles(output: string, files: string[]): Promise<void> {
  try {
    if (settings.dryRun) return logInfo(`[dry-run] merge in ${output}`);
    let content = '';
    for (const f of files) {
      content += await readFile(f);
    }
    await writeFile(output, content);
    logInfo(`File uniti in ${output}`);
  } catch (err: any) {
    logError(`Errore unendo file in ${output}: ${err.message}`);
    throw err;
  }
}

export async function findFiles(dir: string, extension = ''): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await findFiles(fullPath, extension));
    } else if (!extension || entry.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function readJSON<T>(filePath: string): Promise<T> {
  const content = await readFile(filePath);
  return JSON.parse(content) as T;
}

export async function writeJSON(filePath: string, data: unknown): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2));
}
