//---------------------------------------------------------------
function validateStudentData(studentData) { 

  return {
    'badgeNumber': isBadgeNumberValid(studentData.badgeNumber),
    'firstName'  : isNameFieldValid(studentData.firstName, "First name"),
    'lastName'   : isNameFieldValid(studentData.lastName,  "Last name"),
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// possible error conditions:
//   Is empty or undefined
//   Is not numeric
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function isBadgeNumberValid(badgeNumber) {
  if (badgeNumber == null || (typeof badgeNumber === 'string' && badgeNumber.trim().length === 0)) {
    return {'status': 'err', 'msg' : 'Badge number is required'};
  }  
  else if (!isInteger(badgeNumber)) {
    return {'status': 'err', 'msg' : 'Badge number must be an integer'};
  }
  else {
    return {'status': 'ok', 'msg' : ''};
  }
}

function isInteger(value) {
  return /^\d+$/.test(value);
}

function isNameFieldValid(inpField, fieldName) {
  if (inpField == null || (typeof inpField === 'string' && inpField.trim().length === 0)) {
    return {'status': 'err', 'msg' : `${fieldName} is required`};
  }  
  else {
    return {'status': 'ok', 'msg' : ''};
  }
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// any field error will prevent updating the database 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function isOkToUpdate(result) {
  for (const [key, value] of Object.entries(result)) {
    console.log(`Key: ${key}, Value: ${value.status}`);
    if (value.status === 'err') { return false; }
  }
  return true;
}

module.exports = {
  validateStudentData, 
  isBadgeNumberValid,
  isOkToUpdate
};