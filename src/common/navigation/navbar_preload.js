const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node:     () => process.versions.node,
  chrome:   () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  quitButton      : () => ipcRenderer.send('quitButtonClicked'),
  changePage      : (page_name) => ipcRenderer.send('pageButtonClicked', page_name),
  studentsButton  : () => ipcRenderer.send('studentsButtonClicked'),
  checkinButton   : () => ipcRenderer.send('checkinButtonClicked'),

})