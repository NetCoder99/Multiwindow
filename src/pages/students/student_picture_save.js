document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded - Student Save Pciture`)
});

//-------------------------------------------------------------------
// invoked by the save picture button click event
//-------------------------------------------------------------------
try{
  const savePicture = document.getElementById('savePicture');
  const badgeNumber = document.getElementById('badgeNumber');

  savePicture.addEventListener('click', () => {
    console.log('savePicture button was clicked');
    const picturePath = document.getElementById('studentPicturePath').innerHTML;
    window.electronAPI.savePicture({'badgeNumber' : badgeNumber.value, 'picturePath': picturePath});
  })
  window.electronAPI.savePictureResult((result) => {
    if (result.status === 'err') 
      {processSavePictureError(result);}
    else 
      {{processSavePictureSuccess(result);}}  
  })
  function processSavePictureError(result) {
    console.log(`savePictureResult returned an error: ${JSON.stringify(result)}`);
  }
  function processSavePictureSuccess(result) {
    console.log(`savePictureResult succeeded: ${JSON.stringify(result)}`);
  }
}
catch(error){console.log(error);}