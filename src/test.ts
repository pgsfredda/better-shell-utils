import { init, ensureDir, removeDir, writeFile, readFile, appendFile, copyFile, moveFile, mergeFiles, findFiles, readJSON, writeJSON, runCommand } from './index.js';
import path from 'path';

init({ verbose: true, dryRun: false });

async function main() {
  const testDir = path.resolve('test_dir');
  const subDir = path.join(testDir, 'sub');
  const fileA = path.join(testDir, 'a.txt');
  const fileB = path.join(testDir, 'b.txt');
  const merged = path.join(testDir, 'merged.txt');
  const copyDest = path.join(subDir, 'a_copy.txt');
  const moveDest = path.join(subDir, 'a_moved.txt');
  const jsonFile = path.join(testDir, 'config.json');

  try {
    console.log('\n--- Pulizia eventuali test precedenti ---');
    await removeDir(testDir);

    console.log('\n--- Creazione directory ---');
    await ensureDir(subDir);

    console.log('\n--- Creazione file di test ---');
    await writeFile(fileA, 'Contenuto A\n');
    await writeFile(fileB, 'Contenuto B\n');

    console.log('\n--- Append e lettura ---');
    await appendFile(fileA, 'Seconda riga A\n');
    const contentA = await readFile(fileA);
    console.log('Contenuto A:', contentA);

    console.log('\n--- Copia file ---');
    await copyFile(fileA, copyDest);

    console.log('\n--- Sposta file ---');
    await moveFile(copyDest, moveDest);

    console.log('\n--- Merge file ---');
    await mergeFiles(merged, [fileA, fileB]);

    console.log('\n--- Scrittura e lettura JSON ---');
    await writeJSON(jsonFile, { test: true, date: new Date() });
    const config = await readJSON(jsonFile);
    console.log('Config JSON:', config);

    console.log('\n--- Trova file .txt ---');
    const txtFiles = await findFiles(testDir, '.txt');
    console.log(txtFiles);

    console.log('\n--- Esegui comando shell (esempio: echo) ---');
    await runCommand('echo', ['Hello World']);

    console.log('\n✅ Tutti i test completati con successo');

  } catch (err) {
    console.error('❌ Test fallito:', err);
  } finally {
    console.log('\n--- Pulizia finale ---');
    await removeDir(testDir);
  }
}

main();
