const {WebContentsView, ipcMain, dialog } = require('electron/main') 
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const fs       = require('fs');
const root_dir = process.cwd();


function createStudentsWindow(show_devTools = false) {  
  const studentView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'students_preload.js')
    }     
  });
  studentView.setBounds({ x: 10, y: 110, width: 800, height: 800 });
  //const studentViewPath = appRoot + '/src/pages/students/student_details.html';
  const studentViewPath = appRoot + '/src/pages/students/student_main.html';
  studentView.webContents.loadFile(studentViewPath);
  studentView.setVisible(false);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  let validatePath  = path.join(root_dir, 'src', 'pages', 'students', 'student_validate');
  const validateStudentObj    = require(validatePath);

  let dbPath  = path.join(root_dir, 'src', 'data', 'students_procs');
  const {updateStudentsData, searchStudentsData}  = require(dbPath)

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  let sleep_time = 1000;
  ipcMain.on('saveStudentData', (event, studentData) => {
    console.log(`saveStudentData was clicked: ${JSON.stringify(studentData)}`);
    result = validateStudentObj.validateStudentData(studentData);
    if (validateStudentObj.isOkToUpdate(result)) {
      updateStudentsData(studentData);
      result['saveStatus']  = 'ok';
      result['saveMessage'] = 'Student data was updated';
      setTimeout(() => {
        console.log(`saveStudentData was saved to database: ${JSON.stringify(result)}`);
        studentView.webContents.send('saveStudentDataResult', result);
      }, sleep_time);    
    }
    else {
      setTimeout(() => {
        result['saveStatus']  = 'err';
        result['saveMessage'] = 'Student data was not updated';
        console.log(`saveStudentData failed validation: ${JSON.stringify(result)}`);
        studentView.webContents.send('saveStudentDataResult', result);
        result['saveMessage'] = 'Student data was not updated';
      }, sleep_time);    
    }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ipcMain.on('searchByBadge', (event, badgeData) => {
    console.log(`searchByBadge was clicked: ${JSON.stringify(badgeData.badgeNumber)}`);
    results = validateStudentObj.isBadgeNumberValid(badgeData.badgeNumber);
    if (results.status === 'ok') {
      searchStudentsData(badgeData, searchCallBack);
    }
    else {
      setTimeout(() => {
        studentView.webContents.send('searchByBadgeResult', results);
      }, sleep_time);    
    }
  });
  function searchCallBack(results) {
    setTimeout(() => {
      console.log(`studentData was found: ${JSON.stringify(results)}`);
      studentView.webContents.send('searchByBadgeResult', results);
    }, sleep_time);    
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ipcMain.on('selectPicture', (event) => {
    console.log(`selectPicture was clicked`);
    dialog.showOpenDialog({ properties: ['openFile'] })
    .then(result => savePictureSelectionResult(result))
    .catch(err => console.log(err));
  })  
  function savePictureSelectionResult(selectPictureResult) {
    console.log(`savePictureSelection: ${selectPictureResult.filePaths[0]}`)
    const base64 = fs.readFileSync(selectPictureResult.filePaths[0]).toString('base64');
    studentView.webContents.send('selectPictureResult', base64);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (show_devTools) {
    studentView.webContents.openDevTools();
  }
  return studentView;


}  

module.exports = {createStudentsWindow};