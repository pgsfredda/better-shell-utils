# better-shell-utils

Utility moderne per sostituire comandi Bash in Node.js, con gestione errori, async/await e supporto CLI.

## ✅ Caratteristiche
- Comandi FS comuni (mkdir, rm, cp, mv, cat) in versione async/await
- Gestione errori robusta e logging chiaro
- Esecuzione sicura di comandi shell (execa)
- Opzione dry-run per test
- CLI integrata

## 🚀 Installazione
```bash
npm install
```

## ✅ Uso in codice
```javascript
import { init, ensureDir, mergeFiles, runCommand } from 'better-shell-utils';

init({ verbose: true, dryRun: false });

await ensureDir('logs');
await mergeFiles('logs/merged.txt', ['a.txt', 'b.txt']);
await runCommand('pm2', ['restart', 'my-app']);
```

## ✅ Uso come CLI
```bash
npx better-shell mkdir logs
npx better-shell merge --output logs/merged.txt --files a.txt b.txt
npx better-shell exec "pm2 restart my-app"
```
