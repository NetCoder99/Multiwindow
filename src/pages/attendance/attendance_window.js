const {WebContentsView} = require('electron/main') 
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const root_dir = process.cwd();

function createAttendanceWindow(show_devTools = false) {   
  const attendanceView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'attendance_preload.js')
    }     
  });
  attendanceView.setBounds({ x: 10, y: 110, width: 800, height: 800 })
  
  const attendanceViewPath = appRoot + '/src/pages/attendance/attendance_main.html';
  attendanceView.webContents.loadURL(attendanceViewPath);
  attendanceView.setVisible(false);;
  if (show_devTools) {
    attendanceView.webContents.openDevTools();
  }

  let dbPath  = path.join(root_dir, 'src', 'data', 'attendance_procs');
  const {getAttendanceData}  = require(dbPath)

  attendanceView.webContents.once("did-finish-load", () => {
    console.log("did-finish-load");
    results = getAttendanceData({}, fetchCallBack);
  });
  function fetchCallBack(results) {
    console.log(`attendance data was found: ${JSON.stringify(results)}`);
    attendanceView.webContents.send('displayAttendanceData', results);
  };


  return attendanceView;


}  

module.exports = {createAttendanceWindow};