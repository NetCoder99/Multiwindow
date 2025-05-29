const {WebContentsView} = require('electron/main') 
const appRoot = require('app-root-path');

function createNavbarWindow(show_devTools = false) {   
    navbarPreloadPath = appRoot + '/src/common/navigation/navbar_preload.js'
    const navTopView = new WebContentsView({
      webPreferences: {preload: navbarPreloadPath},
    });
    navTopView.setBounds({ x: 10, y: 10, width: 800, height: 100 });
    const navTopViewPath = appRoot + '/src/common/navigation/navbar_buttons.html';
    navTopView.webContents.loadURL(navTopViewPath);
    if (show_devTools) {
      navTopView.webContents.openDevTools();
    }
    return navTopView;
}  

module.exports = {createNavbarWindow};