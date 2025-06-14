const {WebContentsView, ipcMain, dialog } = require('electron/main') 
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const rootPath = appRoot.path;

const fs       = require('fs');
const root_dir = process.cwd();


function createStudentsWindow(show_devTools = false) {  
  const studentView = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'students_preload.js')
    }     
  });
  studentView.setBounds({ x: 10, y: 110, width: 1350, height: 900 });
  const studentViewPath = appRoot + '/src/pages/students/student_layout.html';
  //const studentViewPath = appRoot + '/src/pages/students/student_main.html';
  studentView.webContents.loadFile(studentViewPath);
  studentView.setVisible(false);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  let validatePath  = path.join(root_dir, 'src', 'pages', 'students', 'student_validate');
  const validateStudentObj    = require(validatePath);

  let dbPath  = path.join(root_dir, 'src', 'data', 'students_procs');
  const {updateStudentsData, searchStudentsData}  = require(dbPath)

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  let sleep_time = 1000;
  ipcMain.on('searchByBadge', (event, badgeData) => {
    console.log(`searchByBadgeMain was called: ${JSON.stringify(badgeData.badgeNumber)}`);
    searchByBadge(badgeData, studentView, sleep_time);
  });

  const saveStudentDataPath = path.join(rootPath, 'src', 'pages', 'students', 'functions', 'save_data.js');
  const {saveStudentData}   = require(saveStudentDataPath);
  ipcMain.on('saveStudentData', (event, studentData) => {
    console.log(`saveStudentData was clicked: ${JSON.stringify(studentData)}`);
    saveStudentData(studentView, studentData);
    // result = validateStudentObj.validateStudentData(studentData);
    // if (validateStudentObj.isOkToUpdate(result)) {
    //   updateStudentsData(studentData);
    //   result['saveStatus']  = 'ok';
    //   result['saveMessage'] = 'Student data was updated';
    //   setTimeout(() => {
    //     console.log(`saveStudentData was saved to database: ${JSON.stringify(result)}`);
    //     studentView.webContents.send('saveStudentDataResult', result);
    //   }, sleep_time);    
    // }
    // else {
    //   setTimeout(() => {
    //     result['saveStatus']  = 'err';
    //     result['saveMessage'] = 'Student data was not updated';
    //     console.log(`saveStudentData failed validation: ${JSON.stringify(result)}`);
    //     studentView.webContents.send('saveStudentDataResult', result);
    //     result['saveMessage'] = 'Student data was not updated';
    //   }, sleep_time);    
    // }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const searchBadgePath = path.join(rootPath, 'src', 'pages', 'students', 'functions', 'search_students.js');
  const {searchByBadge} = require(searchBadgePath);
  ipcMain.on('searchByBadge', (event, badgeData) => {
    console.log(`searchByBadgeMain was called: ${JSON.stringify(badgeData.badgeNumber)}`);
    searchByBadge(badgeData, studentView, sleep_time);
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const resizeImagePath      = path.join(rootPath, 'src', 'pages', 'students', 'functions', 'scale_image.js');
  const {scaleImageToHeight} = require(resizeImagePath);
  ipcMain.on('selectPicture', (event) => {
    console.log(`selectPicture was clicked`);
    dialog.showOpenDialog({ properties: ['openFile'] })
    .then(result => selectPictureSelectionResult(result))
    .catch(err => console.log(err));
  })  
 async function selectPictureSelectionResult(selectPictureResult) {
    console.log(`selectPictureSelectionResult: ${selectPictureResult.filePaths[0]}`)
    if (selectPictureResult.canceled) {
      return;
    }
    const resizedImage = await scaleImageToHeight(selectPictureResult.filePaths[0], null, 300) ;
    const base64String = Buffer.from(resizedImage).toString('base64');
    //const base64 = fs.readFileSync(selectPictureResult.filePaths[0]).toString('base64');
    const imageDetails = {
      'file_path'    : selectPictureResult.filePaths[0], 
      'image_string' : base64String
    }
    studentView.webContents.send('selectPictureResult', imageDetails);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const saveImagePath         = path.join(rootPath, 'src', 'pages', 'students', 'functions', 'save_picture.js');
  const {savePictureByBadge}  = require(saveImagePath);
  ipcMain.on('savePicture', (event, badgeData) => {
    console.log(`savePicture was clicked: ${JSON.stringify(badgeData)}`);
    savePictureByBadge(studentView, badgeData);
  })  

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (show_devTools) {
    studentView.webContents.openDevTools();
  }
  return studentView;


}  

module.exports = {createStudentsWindow};