const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node:     () => process.versions.node,
  chrome:   () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle         : (title)       => ipcRenderer.send('set-title', title),  
  asyncMessage     : (callback)    => ipcRenderer.on('asynchronous-message', (_event, value) => callback(value)),
  saveStudentData       : (studentData) => ipcRenderer.send('saveStudentData', studentData),
  saveStudentDataResult : (callback)    => ipcRenderer.on('saveStudentDataResult', (_event, value) => callback(value)),
  searchByBadge         : (badgeData)   => ipcRenderer.send('searchByBadge', badgeData),
  searchByBadgeResult   : (callback)    => ipcRenderer.on('searchByBadgeResult', (_event, value) => callback(value)),
})