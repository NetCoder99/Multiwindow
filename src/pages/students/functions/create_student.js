// ----------------------------------------------------------
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const rootPath = appRoot.path;

// ----------------------------------------------------------
const validate_path           = path.join(rootPath, 'src', 'pages', 'students', 'student_validate.js');
const validateStudentObj      = require(validate_path);

const search_data_path        = path.join(rootPath, 'src', 'data', 'students_procs.js');
const {searchStudentDataSync} = require(search_data_path);

//---------------------------------------------------------------
async function createStudent(studentData, studentView, sleep_time = 1000) {
  console.log(`createStudent was called: ${JSON.stringify(badgeData)}`);
  results = {
    'status': 'ok', 
    'msg'   : 'Creating student data', 
    'studentData' : null
  };
  // // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // let results = validateStudentObj.isBadgeNumberValid(badgeData.badgeNumber);
  // if (results.status === 'ok') {
  //   studentData = await searchStudentDataSync(badgeData.badgeNumber);
  //   if (studentData) {
  //     results = {
  //       'status': 'ok', 
  //       'msg'   : 'Badge number was found.', 
  //       'studentData' : studentData
  //     };
  //   }
  //   else {
  //     results = {
  //       'status': 'err', 
  //       'msg'   : 'No data found that badge.', 
  //       'studentData' : null
  //     };
  //   }
  //   console.log(`studentData: ${studentData}`)
  // }
  setTimeout(() => {
    studentView.webContents.send('searchByBadgeResult', results);
  }, sleep_time);    

}

module.exports = {searchByBadge}
