const sqlite3      = require('sqlite3');
const appRoot      = require('app-root-path');

const {getAttendanceDatabaseV2} = require(appRoot + '/src/data/create_database.js') ;

// //---------------------------------------------------------------
// function createStudentsTable() {
//   const db = getAttendanceDatabase();
//   db.exec(`
//     create table if not exists students (
//         badgeNumber  int primary key not null,
//         firstName    text,
//         lastName     text,
//         email        text,
//         phoneNumber  text,
//         address      text,
//         address2     text,
//         country      text,
//         state        text,
//         zip          text
//     )
//   `);
// }

//---------------------------------------------------------------
function updateStudentsData(studentData) {
  console.log(`updateStudentsData was called: ${JSON.stringify(studentData)}`);
  const db = getAttendanceDatabaseV2();
  db.run(`insert into students 
    (badgeNumber,firstName,lastName, email, phoneHome) 
    values (?, ?, ?, ?, ?) 
    ON CONFLICT(badgeNumber) DO UPDATE SET 
      firstName = excluded.firstName, 
      lastName  = excluded.lastName,
      email     = excluded.email,
      phoneHome = excluded.phoneHome`
    , 
    [ studentData.badgeNumber, 
      studentData.firstName, 
      studentData.lastName,
      studentData.email,
      studentData.phoneHome
    ], 
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Row(s) inserted or updated: ${this.changes}`);
      }
    }
  ); 
  db.close();
}

//---------------------------------------------------------------
function searchStudentsData(badgeData, callback) {
  console.log(`searchStudentsData was called: ${JSON.stringify(badgeData)}`);
  console.log(`badgeNumber: ${badgeData.badgeNumber}`);
  const db = getAttendanceDatabaseV2();

  db.get(`select badgeNumber,
                 firstName,
                 lastName,
                 email,
                 phoneHome
          from students where badgeNumber = ?`, [badgeData.badgeNumber], (err, row) => {
    if (err) {
      console.error({'status': 'err', 'msg': err.message});
      return callback({'status': 'err', 'msg': err.message});
    } else if (row) {
      console.log('Retrieved row:', row);
      row.status = "ok";
      row.msg = "Student data found."
      return callback(row);
    } else {
      console.log({'status': 'err', 'msg': 'No students found for that badge number', 'badgeNumber': badgeData.badgeNumber});
      return callback({'status': 'err', 'msg': 'No students found for that badge number', 'badgeNumber': badgeData.badgeNumber});
    }
  });
  db.close();
}



//---------------------------------------------------------------
module.exports = {
  //createStudentsTable,
  updateStudentsData,
  searchStudentsData
};