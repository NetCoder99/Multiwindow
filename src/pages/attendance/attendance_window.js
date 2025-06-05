const {WebContentsView, ipcMain} = require('electron/main') 
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const root_dir = process.cwd();

let attendanceView = null;
function createAttendanceWindow(show_devTools = false) {   
  attendanceView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'attendance_preload.js')
    }     
  });
  
  attendanceView.setBounds({ x: 10, y: 110, width: 800, height: 800 })
  
  const attendanceViewPath = appRoot + '/src/pages/attendance/attendance_main.html';
  attendanceView.webContents.loadFile(attendanceViewPath);
  attendanceView.setVisible(false);;
  if (show_devTools) {
    attendanceView.webContents.openDevTools();
  }

  let dbPath  = path.join(root_dir, 'src', 'data', 'attendance_procs');
  const {getAttendanceData}  = require(dbPath)

  // ----------------------------------------------------------------------
  attendanceView.webContents.once("did-finish-load", () => {
    console.log("did-finish-load");
    results = getAttendanceData({}, fetchCallBack);
  });
  ipcMain.on("fetchAttendanceData", () => {
    console.log("fetchAttendanceData from webContents");
    results = getAttendanceData({}, fetchCallBack);
  });
  function fetchCallBack(results) {
    //console.log(`attendance data was found: ${JSON.stringify(results)}`);
    attendanceView.webContents.send('displayAttendanceData', results);
  };


  attendanceView.webContents.on("resetDisplay", () => {
    console.log("resetDisplay from webContents");
  });
  attendanceView.webContents.on("focus", () => {
    console.log(`attendanceView received the focus from webcontents`);
  });

  // ipcMain.addListener("resetScreen", () => {
  //   console.log("resetScreen");
  // })  

  return attendanceView;

}  

function resetScreenAttendance() {
  console.log(`attendanceView reset requested`);
  attendanceView.resetScreen();
}

module.exports = {createAttendanceWindow, resetScreenAttendance};