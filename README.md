# better-shell-utils

Modern utilities to substitute Bash shell script commands using Node.js; errors management, async/await, and a mini CLI.

First skeleton version

## ✅ Features
- FS common commands (mkdir, rm, cp, mv, cat) in async/await version
- Robust errors managment and clear logging
- Secur shell commands execution (execa)
- `Dry-run` option for tests
- Integrated CLI

## 🚀 Install
```bash
npm install
```

## ✅ Example
```javascript
import { init, ensureDir, mergeFiles, runCommand } from 'better-shell-utils';

init({ verbose: true, dryRun: false });

await ensureDir('logs');
await mergeFiles('logs/merged.txt', ['a.txt', 'b.txt']);
await runCommand('pm2', ['restart', 'my-app']);
```

## ✅ CLI use example
```bash
npx better-shell mkdir logs
npx better-shell merge --output logs/merged.txt --files a.txt b.txt
npx better-shell exec "pm2 restart my-app"
```
