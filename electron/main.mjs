// electron/main.mjs

import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
// let configWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: join(__dirname, 'preload.mjs')
    },
    autoHideMenuBar: true, // Hide the default menu bar
    maximizable: true, // Prevent window from being maximizable by user
    resizable: true // Prevent window from being resized by user
  });

  // Maximize the window to take full screen height
  

  mainWindow.loadURL('http://localhost:5173'); // Adjust URL as needed

  // function createConfigWindow() {
  //   configWindow = new BrowserWindow({
  //     width: 400,
  //     height: 300,
  //     modal: true,
  //     parent: mainWindow,
  //     webPreferences: {
  //       preload: path.join(__dirname, 'preload.mjs'),
  //       nodeIntegration: true,
  //       contextIsolation: false,
  //     },
  //   });
//   configWindow.loadFile(path.join(__dirname, 'config.html'));
// }


// // Event listener for saving the configuration
// ipcMain.on('save-config', (event, config) => {
//   const configPath = path.join(__dirname, 'config.json');
//   fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
//   event.sender.send('config-saved');
// });





// // Open the configuration window when the main window is loaded
// mainWindow.webContents.on('did-finish-load', () => {
//   createConfigWindow();
// });

 

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
