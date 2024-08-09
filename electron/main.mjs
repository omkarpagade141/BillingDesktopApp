// main.mjs
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { exec } from 'child_process'; 
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

let mainWindow;
let configWindow;
let springBootProcess;
const expressApp = express();
const port = 3000;

// Serve static files from the 'dist' directory
expressApp.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests to the backend server
expressApp.use('/myapi', createProxyMiddleware({
  target: 'http://localhost:8080', // The backend server URL
  changeOrigin: true,
  pathRewrite: { '^/myapi': '' }, // Rewrite the path to match the target
}));

// Handle all other routes by serving the React app
expressApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the Express server
expressApp.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function startSpringBoot() {
  const jarPath = path.join(__dirname, 'resources', 'app-0.0.1-SNAPSHOT.jar');
  const command = os.platform() === 'win32' ? `java -jar "${jarPath}"` : `java -jar "${jarPath}"`;

  springBootProcess = exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Spring Boot app: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Spring Boot stderr: ${stderr}`);
      return;
    }
    console.log(`Spring Boot stdout: ${stdout}`);
  });

  springBootProcess.stdout.on('data', (data) => {
    console.log(`Spring Boot stdout: ${data}`);
  });

  springBootProcess.stderr.on('data', (data) => {
    console.error(`Spring Boot stderr: ${data}`);
  });
}

function stopSpringBoot() {
  if (springBootProcess) {
    springBootProcess.kill('SIGTERM');
    springBootProcess = null;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
  });

  // Load the URL served by the local server
  mainWindow.loadURL(`http://localhost:${port}`);

  const configPath = path.join(__dirname, 'config.json');
  if (!fs.existsSync(configPath)) {
    createConfigWindow();
  }

  ipcMain.on('save-config', async (event, config) => {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    // Call your sendConfig function here
    await sendConfig();
    console.log('sendConfigCalled');
    event.sender.send('config-saved');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    stopSpringBoot();
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

app.on('ready', () => {
  // Start Spring Boot
  startSpringBoot();
  // Start the Express server and create the Electron window
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (springBootProcess) {
      stopSpringBoot();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
