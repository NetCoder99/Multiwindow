const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node:     () => process.versions.node,
  chrome:   () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  resetDisplay          : (callback)    => ipcRenderer.on('resetDisplay', (_event, value) => callback(value)),
  setTitle              : (title)       => ipcRenderer.send('set-title', title),  
  asyncMessage          : (callback)    => ipcRenderer.on('asynchronous-message', (_event, value) => callback(value)),
  saveStudentData       : (studentData) => ipcRenderer.send('saveStudentData', studentData),
  saveStudentDataResult : (callback)    => ipcRenderer.on('saveStudentDataResult', (_event, value) => callback(value)),
  searchByBadge         : (badgeData)   => ipcRenderer.send('searchByBadge', badgeData),
  searchByBadgeResult   : (callback)    => ipcRenderer.on('searchByBadgeResult', (_event, value) => callback(value)),
  generateBadge         : (badgeData)   => ipcRenderer.send('generateBadge', badgeData),
  generateBadgeResult   : (callback)    => ipcRenderer.on('generateBadgeResult', (_event, value) => callback(value)),
  selectPicture         : ()            => ipcRenderer.send('selectPicture'),
  selectPictureResult   : (callback)    => ipcRenderer.on('selectPictureResult', (_event, value) => callback(value)),
})