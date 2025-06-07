const appRoot      = require('app-root-path');
const {getAttendanceDatabaseV2} = require(appRoot + '/src/data/create_database.js') ;

const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

const getBadgeDataStr = `
  select badgeNumber   as badgeNumber ,
        firstName     as firstName ,
        lastName      as lastName ,
        'Rising Sun Martial Arts'                               as title1,
        'Building tomorrows leaders, one black belt at a time!' as title2,
        'Birthday: ' || birthDate    as subField1,
        'Since: '    || memberSince  as subField2,
        '/src/images/RSM_Logo1.jpg'  as schoolLogoPath,
        '/src/images/RSM_Logo1.jpg'  as studentImagePath,
        '/src/images/1565.png'       as barcodeImagePath
  from students where badgeNumber = ?`;

// //---------------------------------------------------------------
// function fetchBadgeData(badgeData, callback) {
//   console.log(`searchStudentsData was called: ${JSON.stringify(badgeData)}`);
//   console.log(`badgeNumber: ${badgeData.badgeNumber}`);
//   const db = getAttendanceDatabaseV2();

//   db.get(`select badgeNumber   as badgeNumber ,
//                  firstName     as firstName ,
//                  lastName      as lastName ,
//                  'Rising Sun Martial Arts'                               as title1,
//                  'Building tomorrows leaders, one black belt at a time!' as title2,
//                  'Birthday: ' || birthDate    as subField1,
//                  'Since: '    || memberSince  as subField2,
//                  '/src/images/RSM_Logo1.jpg'  as schoolLogoPath,
//                  '/src/images/RSM_Logo1.jpg'  as studentImagePath,
//                  '/src/images/1565.png'       as barcodeImagePath
//           from students where badgeNumber = ?`, [badgeData.badgeNumber], (err, row) => {
//     if (err) {
//       console.error({'status': 'err', 'msg': err.message});
//       return callback({'status': 'err', 'msg': err.message});
//     } else if (row) {
//       console.log('Retrieved row:', row);
//       row.status = "ok";
//       row.msg = "Student data found."
//       return callback(row);
//     } else {
//       console.log({'status': 'err', 'msg': 'No students found for that badge number', 'badgeNumber': badgeData.badgeNumber});
//       return callback({'status': 'err', 'msg': 'No students found for that badge number', 'badgeNumber': badgeData.badgeNumber});
//     }
//   });
//   db.close();
// }

async function getBadgeData(badgeNumber) {
  const shared_folder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
  const db_directory = shared_folder + '/Attendance' + '/AttendanceV2.db'
  //const db = getAttendanceDatabaseV2();
  let db;
  try {
    db = await sqlite.open({
      filename: db_directory,
      driver: sqlite3.Database
    });
    // const slctStmt = `
    //   select badgeNumber, firstName || ' ' || lastName as studentName
    //   from   students s 
    //   where  badgeNumber = ?
    // `;
    const row = await db.get(getBadgeDataStr, badgeNumber);
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
module.exports = {getBadgeData}
