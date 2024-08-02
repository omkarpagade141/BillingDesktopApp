import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import sendConfig from './sendConfig.js';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let configWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
    },
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
  });

  mainWindow.loadURL('http://localhost:5173'); // Adjust URL as needed
  console.log('Preload script path:', path.join(__dirname, 'preload.js'));

  // Check if config.json exists
  const configPath = path.join(__dirname, 'config.json');
  if (!fs.existsSync(configPath)) {
    // Create config window if config.json does not exist
    createConfigWindow();
  }

  ipcMain.on('save-config', async (event, config) => {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    // await sendConfig();
    console.log('sendConfigCalled'); // Call sendConfig to send the configuration to the backend
    event.sender.send('config-saved');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createConfigWindow() {
  configWindow = new BrowserWindow({
    width: 400,
    height: 300,
    modal: true,
    parent: mainWindow,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
    },
  });
  configWindow.loadFile(path.join(__dirname, 'config.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
