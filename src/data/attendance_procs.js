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
    order  by checkinDateTime desc, checkinTime desc
    limit  10;
  `

  db.all(search_stmt, [badgeData.badgeNumber], (err, rows) => {
    if (err) {
      console.error(   {'status': 'err', 'msg': err.message});
      return callback( {'status': 'err', 'msg': err.message});
    } else if (rows) {
      //console.log(`Retrieved rows: ${JSON.stringify(rows)}` );
      return callback(rows);
    } else {
      err_msg = {'status': 'err', 'msg': 'No attendance found for that badge number', 'badgeNumber': badgeData.badgeNumber}
      console.log(err_msg);
      return callback(err_msg);
    }
  });
  db.close();
}

function getFormatAllDatesStmt() {
  return `
    update attendance 
    set    checkinDateTime = fdt.formatDateTime
    from   
    ( 
      select attendance_id,
              (
                substr(checkinDate, 7, 4) || '-' || substr(checkinDate, 1, 2) || '-' || substr(checkinDate, 4, 2)
                || ' ' || 
                case when instr(checkinTime, 'PM') then
                    cast(cast(substr(checkinTime, 1, 1) as integer) +12 as text) || ':' || substr(checkinTime, 3, 2)
                    else     
                    '0' || substr(checkinTime, 1, 1) || ':' || substr(checkinTime, 3, 2)
              end) as formatDateTime             
      from   attendance a 
    ) as fdt
    where attendance.attendance_id = fdt.attendance_id
`
}

function updateMissingStudentDetails() {
  return `
    update attendance 
    set    studentName = std.studentName
    from 
    (
      select badgeNumber, 
            firstName || ' ' || lastName as studentName
      from   students s 
    ) as std
    where  attendance.studentName is NULL
    and    attendance.badgeNumber = std.badgeNumber
`
}

//---------------------------------------------------------------
module.exports = {
  getAttendanceData
};


