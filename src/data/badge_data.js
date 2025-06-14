const appRoot      = require('app-root-path');
const {getDatabaseLocation} = require(appRoot + '/src/data/create_database.js');

const sqlite3 = require('sqlite3').verbose();
const sqlite  = require('sqlite');

//ALTER TABLE students ADD studentImage     BLOB;
//ALTER TABLE students ADD studentImagePath TEXT;

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
        '/src/images/1565.png'       as barcodeImagePath,
        studentImage                 as studentImage 
  from students where badgeNumber = ?`;

//---------------------------------------------------------------
async function getBadgeData(badgeNumber) {
  const db_directory = getDatabaseLocation();
  //const db = getAttendanceDatabaseV2();
  let db;
  try {
    db = await sqlite.open({
      filename: db_directory,
      driver: sqlite3.Database
    });
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
// {}
//---------------------------------------------------------------
async function savePictureData(pictureData) {
  const db_directory = getDatabaseLocation();
  let db;
  try {
    const db = new sqlite3.Database(db_directory); 
    const updateStmt = db.prepare(`
      update students 
      set    studentImage = ?
      where  badgeNumber  = ?
    `);
    
    updateStmt.run(pictureData.imageBuffer, pictureData.badgeNumber, (err) => {
      if (err) {
        console.error('Error inserting image:', err);
      } else {
        console.log('Image inserted successfully!');
      }
      updateStmt.finalize();
    });
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
module.exports = {getBadgeData, savePictureData}
