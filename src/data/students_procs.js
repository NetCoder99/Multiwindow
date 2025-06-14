const sqlite       = require('sqlite');
const sqlite3      = require('sqlite3');
const appRoot      = require('app-root-path');

const {getAttendanceDatabaseV2, getDatabaseLocation} = require(appRoot + '/src/data/create_database.js') ;

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

// ----------------------------------------------------------------------------------------------
// 
// ----------------------------------------------------------------------------------------------
const searchStudentStmt = `
  SELECT  badgeNumber 
       ,ifnull(firstName,  '') as firstName
       ,''                     as middleName
       ,ifnull(lastName,   '') as lastName 
       ,ifnull(namePrefix, '') as namePrefix 
       ,ifnull(email,      '') as email
       ,ifnull(address,    '') as address
       ,ifnull(address2,   '') as address2
       ,ifnull(city,       '') as city
       ,ifnull(country,    '') as country
       ,ifnull(state,      '') as state
       ,ifnull(zip,        '') as zipCode
       ,ifnull(birthDate,  '') as birthDate
       ,ifnull(phoneHome,  '') as phoneHome
       ,ifnull(phoneMobile, '') as phoneMobile
       ,ifnull(status,      '') as status
       ,ifnull(memberSince, '') as memberSince
       ,ifnull(gender,      '') as gender
       ,ifnull(currentRank, '') as currentRank
       ,ifnull(ethnicity,   '') as ethnicity
  FROM students
  where  badgeNumber = ?
`
async function searchStudentDataSync(badgeNumber) {
  const db_directory = getDatabaseLocation()
  let db;
  try {
    db = await sqlite.open({
      filename: db_directory,
      driver: sqlite3.Database
    });
    const row = await db.get(searchStudentStmt, badgeNumber);
    return row;
  } catch (err) {
    console.error('Error fetching row:', err);
    throw err; // Re-throw the error for handling by the caller
  } finally {
    if (db) {
      await db.close();
    }
  }
}

//---------------------------------------------------------------
module.exports = {
  //createStudentsTable,
  updateStudentsData,
  searchStudentsData,
  searchStudentDataSync
};