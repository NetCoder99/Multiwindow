const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  fetchAttendanceData   : ()            => ipcRenderer.send('fetchAttendanceData', badgeData),
  displayAttendanceData : (callback)    => ipcRenderer.on('displayAttendanceData', (_event, value) => callback(value)),
})