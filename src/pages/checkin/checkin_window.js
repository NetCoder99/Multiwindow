const {WebContentsView, ipcMain} = require('electron/main') 
const appRoot = require('app-root-path');
const path    = require('node:path')  

const dbPathCheckin   = appRoot + '/src/data/checkin_procs';
const dbPathStudents  = appRoot + '/src/data/students_procs';

const {insertCheckinRecord}  = require(dbPathCheckin)
const {searchStudentsData}   = require(dbPathStudents)

function createCheckinWindow(show_devTools = false) {   
  const checkinView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'checkin_preload.js')
    }     
  })
  checkinView.setBounds({ x: 10, y: 110, width: 800, height: 800 })
  const checkinViewPath = appRoot + '/src/pages/checkin/checkin_main.html'
  checkinView.webContents.loadURL(checkinViewPath)
  checkinView.setVisible(false);
  if (show_devTools) {
    checkinView.webContents.openDevTools();
  }

  let sleep_time = 2000;
  ipcMain.on('saveCheckin', (event, badgeNumber) => {
    console.log(`saveCheckin was invoked: ${JSON.stringify(badgeNumber)}`);
    insertCheckinRecord(badgeNumber);
    searchStudentsData({'badgeNumber': badgeNumber}, checkinCallBack)
  });
  function checkinCallBack(results) {
    setTimeout(() => {
      console.log(`studentData was found for check-in: ${JSON.stringify(results)}`);
      checkinView.webContents.send('saveCheckinResult', results);
    }, sleep_time);    
  }
  return checkinView;
}  

module.exports = {createCheckinWindow};