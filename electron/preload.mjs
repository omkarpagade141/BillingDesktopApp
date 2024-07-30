// // preload.mjs
// import { contextBridge, ipcRenderer } from 'electron';

// contextBridge.exposeInMainWorld('myAPI', {
//   send: (channel, data) => {
//     // Ensure these actions are allowed
//     let validChannels = ['channel1', 'channel2'];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data);
//     }
//   },
//   receive: (channel, func) => {
//     let validChannels = ['channel1', 'channel2'];
//     if (validChannels.includes(channel)) {
//       // Deliberately strip event as it includes `sender`
//       ipcRenderer.on(channel, (event, ...args) => func(...args));
//     }
//   }
// });






// import { contextBridge, ipcRenderer } from 'electron';

// // Expose IPC methods to the renderer process
// contextBridge.exposeInMainWorld('electron', {
//   saveConfig: (config) => ipcRenderer.send('save-config', config),
//   onConfigSaved: (callback) => ipcRenderer.on('config-saved', callback),
// });
