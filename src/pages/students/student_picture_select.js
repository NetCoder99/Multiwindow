document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded - Student Select Pciture`)
});

//-------------------------------------------------------------------
// invoked by the select picture button click event
//-------------------------------------------------------------------
try{
  const selectPicture = document.getElementById('selectPicture');
  selectPicture.addEventListener('click', () => {
    console.log('selectPicture button was clicked');
    window.electronAPI.selectPicture();
  })
  window.electronAPI.selectPictureResult((result) => {
    console.log(`selectPictureResult was activated`);
    studentPicture.src = `data:image/jpg;base64,${result.image_string}`;
    document.getElementById('studentPicturePath').innerHTML = result.file_path;
  })
}
catch(error){console.log(error);}