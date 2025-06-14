// ----------------------------------------------------------
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const rootPath = appRoot.path;

// ----------------------------------------------------------
const validate_path           = path.join(rootPath, 'src', 'pages', 'students', 'student_validate.js');
const validateStudentObj      = require(validate_path);

const badgeProcsPath          = path.join(rootPath, 'src', 'data', 'badge_data.js');
const {getBadgeData, savePictureData} = require(badgeProcsPath);
const resizeImagePath         = path.join(rootPath, 'src', 'pages', 'students', 'functions', 'scale_image.js');
const {scaleImageToHeight}    = require(resizeImagePath);

//---------------------------------------------------------------
async function saveStudentData(studentView, studentData) {
  console.log(`savePictureByBadge was called: ${JSON.stringify(studentData)}`);
  // validationResult = validateStudentObj.isBadgeNumberValid(badgeData.badgeNumber)
  // if (validationResult.status === 'err') {
  //   console.log(`savePictureByBadge: badge was invalid - ${JSON.stringify(validationResult)}`);
  //   studentView.webContents.send('savePictureResult', validationResult);
  //   return;      
  // }

  // const badgeSearchResults = await getBadgeData(badgeData.badgeNumber);
  // if (!badgeSearchResults){
  //   results = {'status': 'err', 'msg' : 'Badge number does not exist'};
  //   console.log(`savePictureByBadge: badge was not found - ${JSON.stringify(results)}`);
  //   studentView.webContents.send('savePictureResult', results);
  //   return;      
  // }

  // console.log(`savePictureByBadge: saving picture`);
  // const resizedImage = await scaleImageToHeight(badgeData.picturePath, null, 300) ;
  // imageBytes  = null;
  // pictureData = {
  //   'badgeNumber' : badgeData.badgeNumber,
  //   'imageBuffer' : resizedImage
  // };
  // savePictureData(pictureData);


}

module.exports = {saveStudentData}
