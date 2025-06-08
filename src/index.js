const { app, BaseWindow, WebContentsView, BrowserWindow, ipcMain, protocol } = require('electron');
const PDFWindow = require('electron-pdf-window');
const path      = require('node:path');
const appRoot   = require('app-root-path');

const {generateStudentBadge}   = require(appRoot + '/src/common/badge_procs.js');
//const {getTestStudentData}     = require(appRoot + '/src/barcode_printer/test_data.js');

const {createNavbarWindow}     = require(appRoot + '/src/common/navigation/navbar_window');
const {createCheckinWindow}    = require(appRoot + '/src/pages/checkin/checkin_window.js');
const {createStudentsWindow}   = require(appRoot + '/src/pages/students/students_window.js');
const {createAttendanceWindow, resetScreenAttendance} = require(appRoot + '/src/pages/attendance/attendance_window.js') ;

app.whenReady().then(() => {
  //createCheckinsTable();
  //createStudentsTable();
  const winBase = new BaseWindow({x: 100, y:100, width: 1280, height: 1024})

  // ----------------------------------------------------------------------
  var navTopView     = createNavbarWindow();
  var checkinView    = createCheckinWindow();
  var studentsView   = createStudentsWindow();
  var attendanceView = createAttendanceWindow();

  winBase.contentView.addChildView(navTopView);
  winBase.contentView.addChildView(checkinView);
  winBase.contentView.addChildView(studentsView);
  winBase.contentView.addChildView(attendanceView);

  const { width, height } = winBase.getBounds();
  nav_bounds   = {x: 0,  y: 0,   width: width - 15, height: height - 15}
  child_bounds = {x: 10, y: 110, width: width - 45, height: height - 15}
  navTopView.setBounds(nav_bounds);
  checkinView.setBounds(child_bounds);
  studentsView.setBounds(child_bounds);
  attendanceView.setBounds(child_bounds);
  
  switchToSelectedPage('student');

  // ----------------------------------------------------------------------
  winBase.on('resize', () => {
    const { width, height } = winBase.getBounds();
    nav_bounds   = {x: 0,  y: 0,   width: width - 15, height: height - 15}
    child_bounds = {x: 10, y: 110, width: width - 45, height: height - 15}
    navTopView.setBounds(nav_bounds);
    checkinView.setBounds(child_bounds);
    studentsView.setBounds(child_bounds);
    attendanceView.setBounds(child_bounds);
  });


  // ----------------------------------------------------------------------
  ipcMain.on('quitButtonClicked', () => {
    console.log(`quitButtonClicked was invoked at app level`);
    app.quit();
  });

  // ----------------------------------------------------------------------
  ipcMain.on('pageButtonClicked', (event, buttonName) => {
    console.log(`pageButtonClicked was invoked at app level for: ${buttonName}`);
    switchToSelectedPage(buttonName);
  });

  // ----------------------------------------------------------------------
  function switchToSelectedPage(buttonName) {
    const buttonNameLower = String(buttonName).toLocaleLowerCase();
    if (buttonNameLower.includes("attendance")) {
      studentsView.setVisible(false);
      checkinView.setVisible(false);
      attendanceView.setVisible(true);
      attendanceView.webContents.send('resetDisplay');
    } else if (buttonNameLower.includes("student")) {
      checkinView.setVisible(false);
      attendanceView.setVisible(false);
      studentsView.setVisible(true);
      studentsView.webContents.send('resetDisplay');
    } else {
      studentsView.setVisible(false);
      checkinView.setVisible(true);
      attendanceView.setVisible(false);
    }
    navTopView.webContents.send('changePageResult', {'buttonName' : buttonName});
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ipcMain.on('generateBadge', async (event, studentData) => {
    console.log(`generateBadge was clicked: ${JSON.stringify(studentData)}`);
    generateStudentBadge(studentData, studentsView);
  });


});