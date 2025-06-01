const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  resetDisplay          : (callback)    => ipcRenderer.on('resetDisplay', (_event, value) => callback(value)),
  fetchAttendanceData   : ()            => ipcRenderer.send('fetchAttendanceData'),
  displayAttendanceData : (callback)    => ipcRenderer.on('displayAttendanceData', (_event, value) => callback(value))
})