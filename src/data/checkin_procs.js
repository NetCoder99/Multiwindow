const { platform } = require('node:process');
const appRoot      = require('app-root-path');

const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');


const {getAttendanceDatabaseV2} = require(appRoot + '/src/data/create_database.js') ;
const {formatCheckinDate, formatCheckinTime, formatCheckinDateTime} = require(appRoot + '/src/common/format_date.js') ;

// //---------------------------------------------------------------
// function createCheckinsTable() {
//   const db = getAttendanceDatabase();
//   db.exec(`
//     create table if not exists checkins (
//         badgeNumber      int,
//         checkin_datetime text
//     )
//   `);

//   db.exec(`
//     drop   index if exists checkins_n1; 
//     create index checkins_n1 on checkins (badgeNumber); 
//   `);
// }

//---------------------------------------------------------------
async function insertCheckinRecord(badgeNumber) {
  console.log(`insertCheckinRecord was called: ${badgeNumber}`);
  //const db = new sqlite3.Database(db_location);
  const db = getAttendanceDatabaseV2();
  
  const user = await getStudentData(badgeNumber);
  //const studentData = getStudentDetails(db, badgeNumber); 

  const crnt_datetime = new Date();crnt_datetime.toISOString().replace('T', ' ')
  checkinDateTime = formatCheckinDateTime(crnt_datetime);
  checkinDate     = formatCheckinDate(crnt_datetime);
  checkinTime     = formatCheckinTime(crnt_datetime);
  console.log(`badgeNumber: ${badgeNumber} -- checkinDate:${checkinDate} - checkinTime:${checkinTime}`);
  db.run(
    `INSERT INTO attendance(badgeNumber, checkinDateTime, checkinDate, checkinTime, studentName)
    VALUES(?, ?, ?, ?, ?);`
    , 
    [badgeNumber, checkinDateTime, checkinDate, checkinTime, user.studentName], 
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Checkin row(s) inserted or updated: ${this.changes}`);
      }
    }
  ); 

 db.close();
}

async function getStudentData(badgeNumber) {
  const shared_folder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
  const db_directory = shared_folder + '/Attendance' + '/AttendanceV2.db'
  //const db = getAttendanceDatabaseV2();
  let db;
  try {
    db = await sqlite.open({
      filename: db_directory,
      driver: sqlite3.Database
    });
    const slctStmt = `
      select badgeNumber, firstName || ' ' || lastName as studentName
      from   students s 
      where  badgeNumber = ?
    `;
    const row = await db.get(slctStmt, badgeNumber);
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

// //---------------------------------------------------------------
// function getStudentDetails(db, badgeNumber) {
//   const slctStmt = `
//     select badgeNumber, firstName || ' ' || lastName as studentName
//     from   students s 
//     where  badgeNumber = ${badgeNumber}
//   `;

//   db.get(slctStmt, (err, row) => {
//     if (err) {
//       console.error(err.message);
//       return {};
//     }
//     return row;
//   });
//   db.close();
// }

//---------------------------------------------------------------
function searchCheckinsData(badgeNumber, callback) {
  console.log(`searchCheckinsData was called: ${JSON.stringify(badgeData)}`);
  // const db = new sqlite3.Database(db_location);
  // db.get("select badgeNumber,checkin_datetime where badgeNumber = ?", [badgeNumber], (err, row) => {
  //   if (err) {
  //     console.error({'status': 'err', 'msg': err.message});
  //     return callback({'status': 'err', 'msg': err.message});
  //   } else if (row) {
  //     console.log('Retrieved row:', row);
  //     row.status = "ok";
  //     row.msg = "Checkin data found."
  //     return callback(row);
  //   } else {
  //     console.log({'status': 'err', 'msg': 'No checkins found for that badge number'});
  //     return callback({'status': 'err', 'msg': 'No checkins found for that badge number'});
  //   }
  // });
  // db.close();
}

//---------------------------------------------------------------
module.exports = {
  //createCheckinsTable,
  insertCheckinRecord,
  searchCheckinsData
};