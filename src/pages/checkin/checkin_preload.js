const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node:     () => process.versions.node,
  chrome:   () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  saveCheckin       : (badgeData) => ipcRenderer.send('saveCheckin', badgeData),
  saveCheckinResult : (callback)  => ipcRenderer.on('saveCheckinResult', (_event, value) => callback(value)),
})