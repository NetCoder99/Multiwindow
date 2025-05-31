const { platform } = require('node:process');
const appRoot      = require('app-root-path');
const fs           = require('fs');
const sqlite3      = require('sqlite3');

//const {getAttendanceDatabaseV2} = require(appRoot + '/src/data/create_database.js') ;
const {getAttendanceDatabase} = require(appRoot + '/src/data/create_database.js') ;
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
function insertCheckinRecord(badgeNumber) {
  console.log(`insertCheckinRecord was called: ${badgeNumber}`);
  //const db = new sqlite3.Database(db_location);
  const db = getAttendanceDatabaseV2();

  const crnt_datetime = new Date();crnt_datetime.toISOString().replace('T', ' ')
  checkinDateTime = formatCheckinDateTime(crnt_datetime);
  checkinDate     = formatCheckinDate(crnt_datetime);
  checkinTime     = formatCheckinTime(crnt_datetime);
  console.log(`badgeNumber: ${badgeNumber} -- checkinDate:${checkinDate} - checkinTime:${checkinTime}`);
  db.run(
    `INSERT INTO attendance(badgeNumber, checkinDateTime, checkinDate, checkinTime)
    VALUES(?, ?, ?, ?);`
    , 
    [badgeNumber, checkinDateTime, checkinDate, checkinTime], 
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Checkin row(s) inserted or updated: ${this.changes}`);
      }
    }
  ); 

//   db.run(
//     `insert into checkins (badgeNumber, checkinDate, checkinTime) 
//      values (?, datetime('now', 'localtime'))`, 
//    [badgeNumber,], 
//    function(err) {
//      if (err) {
//        console.error(err.message);
//      } else {
//        console.log(`Checkin row(s) inserted or updated: ${this.changes}`);
//      }
//    }
//  ); 

 db.close();
}

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