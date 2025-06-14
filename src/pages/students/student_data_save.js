document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded - Student Save Data`)
});

//-------------------------------------------------------------------
// invoked by the save picture button click event
//-------------------------------------------------------------------
try{
  const saveData = document.getElementById('saveButton');

  saveData.addEventListener('click', () => {
    console.log('savePicture button was clicked');
    formData = document.getElementById('formStudentData');
    window.electronAPI.saveStudentData({'formData' : GetAllDataFields()});
  })



  // window.electronAPI.savePictureResult((result) => {
  //   if (result.status === 'err') 
  //     {processSavePictureError(result);}
  //   else 
  //     {{processSavePictureSuccess(result);}}  
  // })
  // function processSavePictureError(result) {
  //   console.log(`savePictureResult returned an error: ${JSON.stringify(result)}`);
  // }
  // function processSavePictureSuccess(result) {
  //   console.log(`savePictureResult succeeded: ${JSON.stringify(result)}`);
  // }

  function GetAllDataFields() {
    return {
      'badgeNumber': document.getElementById('badgeNumber').value,
      'firstName'  : document.getElementById('firstName').value,
      'middleName' : document.getElementById('middleName').value,
      'lastName'   : document.getElementById('lastName').value,
      'address'    : document.getElementById('address').value,
      'address2'   : document.getElementById('address2').value,
      'city'       : document.getElementById('city').value,
      'state'      : document.getElementById('state').value,
      'zipCode'    : document.getElementById('zipCode').value      
    }
  };


}
catch(error){console.log(error);}