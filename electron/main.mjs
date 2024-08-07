import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import os from 'os';
import sendConfig from './sendConfig.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let mainWindow;
let configWindow;
let springBootProcess;




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
      webSecurity: true, // Allows file:// protocol access
    },
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
  });

  const indexHtmlPath = path.join(__dirname, '..', 'frontend', 'DesktopApp', 'dist', 'index.html');
  mainWindow.loadURL('http://localhost:5173')
  if (fs.existsSync(indexHtmlPath)) {
    // mainWindow.loadFile(indexHtmlPath)
  } else {
    console.log('file not found');


    console.error(`Index file not found at ${indexHtmlPath}`);
  }

  const configPath = path.join(__dirname, 'config.json');
  if (!fs.existsSync(configPath)) {
    createConfigWindow();
  }

  ipcMain.on('save-config', async (event, config) => {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    await sendConfig();
    console.log('sendConfigCalled');
    event.sender.send('config-saved');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    // stopSpringBoot();
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

  // startSpringBoot();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (springBootProcess) {
      // stopSpringBoot();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
