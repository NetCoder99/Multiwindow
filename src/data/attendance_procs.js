const { platform } = require('node:process');
const appRoot      = require('app-root-path');
const fs           = require('fs');
const sqlite3      = require('sqlite3');

const {getAttendanceDatabaseV2} = require(appRoot + '/src/data/create_database.js') ;

//---------------------------------------------------------------
function getAttendanceData(badgeData, callback) {
  console.log(`searchStudentsData was called: ${JSON.stringify(badgeData)}`);
  console.log(`badgeNumber: ${badgeData.badgeNumber}`);
  const db = getAttendanceDatabaseV2();
  
  search_stmt = `
    select attendance_id, 
           badgeNumber, 
           checkinDate, 
           checkinTime, 
           studentName, 
           studentStatus, 
           className, 
           rankName, 
           classStartTime
    from   attendance
    limit  10;
  `

  db.all(search_stmt, [badgeData.badgeNumber], (err, rows) => {
    if (err) {
      console.error(   {'status': 'err', 'msg': err.message});
      return callback( {'status': 'err', 'msg': err.message});
    } else if (rows) {
      console.log(`Retrieved rows: ${JSON.stringify(rows)}` );
      return callback(rows);
    } else {
      err_msg = {'status': 'err', 'msg': 'No attendance found for that badge number', 'badgeNumber': badgeData.badgeNumber}
      console.log(err_msg);
      return callback(err_msg);
    }
  });
  db.close();
}

//---------------------------------------------------------------
module.exports = {
  getAttendanceData
};