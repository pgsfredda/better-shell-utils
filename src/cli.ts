#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  ensureDir,
  removeDir,
  mergeFiles,
  runCommand,
  copyFile,
  moveFile,
  findFiles
} from './index.js';

// --- Comando mkdir ---
yargs(hideBin(process.argv))
  .command<{ dir: string }>(
    'mkdir <dir>',
    'Crea una directory',
    yargs => yargs.positional('dir', { type: 'string' }),
    async argv => {
      await ensureDir(argv.dir);
    }
  )

  // --- Comando rmdir ---
  .command<{ dir: string }>(
    'rmdir <dir>',
    'Rimuove una directory',
    yargs => yargs.positional('dir', { type: 'string' }),
    async argv => {
      await removeDir(argv.dir);
    }
  )

  // --- Comando merge ---
  .command<{ output: string; files: string[] }>(
    'merge',
    'Unisce file in un singolo file',
    yargs => yargs
      .option('output', { type: 'string', demandOption: true })
      .option('files', { type: 'array', demandOption: true }),
    async argv => {
      await mergeFiles(argv.output, argv.files);
    }
  )

  // --- Comando exec ---
  .command<{ cmd: string }>(
    'exec <cmd>',
    'Esegue un comando shell',
    yargs => yargs.positional('cmd', { type: 'string' }),
    async argv => {
      const parts = argv.cmd.split(' ');
      const command = parts.shift()!;
      await runCommand(command, parts, { failOnError: true });
    }
  )

  // --- Comando cp ---
  .command<{ src: string; dest: string }>(
    'cp <src> <dest>',
    'Copia un file',
    yargs => yargs
      .positional('src', { type: 'string' })
      .positional('dest', { type: 'string' }),
    async argv => {
      await copyFile(argv.src, argv.dest);
    }
  )

  // --- Comando mv ---
  .command<{ src: string; dest: string }>(
    'mv <src> <dest>',
    'Sposta un file',
    yargs => yargs
      .positional('src', { type: 'string' })
      .positional('dest', { type: 'string' }),
    async argv => {
      await moveFile(argv.src, argv.dest);
    }
  )

  // --- Comando find ---
  .command<{ dir: string; ext: string }>(
    'find',
    'Trova file in una directory',
    yargs => yargs
      .option('dir', { type: 'string', default: '.' })
      .option('ext', { type: 'string', default: '' }),
    async argv => {
      const files = await findFiles(argv.dir, argv.ext);
      console.log(files.join('\n'));
    }
  )

  .demandCommand(1, 'Devi specificare un comando valido')
  .strict()
  .help()
  .parse();
