// electron/main.mjs

import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, 'preload.mjs')
    },
    autoHideMenuBar: true, // Hide the default menu bar
    maximizable: true, // Prevent window from being maximizable by user
    resizable: true // Prevent window from being resized by user
  });

  // Maximize the window to take full screen height
  mainWindow.maximize();

  mainWindow.loadURL('http://localhost:5173'); // Adjust URL as needed

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
