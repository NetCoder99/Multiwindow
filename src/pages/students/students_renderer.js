document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded`)
});

try {
  const information = document.getElementById('info')
  information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`
}
catch(error){
  console.log(error);

}

// //-------------------------------------------------------------------
// // Trap the enter key on the badge number field
// //-------------------------------------------------------------------
// badgeNumber = document.getElementById('badgeNumber')
// badgeNumber.addEventListener('keypress', (event) => {
//   console.log(`keypress was detected: `)
//   if (event.key === 'Enter') {
//     event.preventDefault();
//     console.log(`enter key detected: ${badgeNumber.value}`)
//     searchByBadgeNumber()
//   }  
// })
// function resetBadgeNumber(inpValue) {
//   console.log(`resetBadgeNumber: ${inpValue}`)
//   badgeNumber.value = inpValue
// }

// //-------------------------------------------------------------------
// // invoked by the search button click event
// //-------------------------------------------------------------------
// const searchButton = document.getElementById('searchButton')
// searchButton.addEventListener('click', () => {
//   searchByBadgeNumber();
// })
// function searchByBadgeNumber() {
//   console.log('Search button was clicked')
//   badgeNumber = document.getElementById('badgeNumber')
//   badgeNumber = {
//     'badgeNumber' : badgeNumber.value,
//   }
//   console.log(`studentData: ${JSON.stringify(badgeNumber)}`);
//   setFormEnabled(document.getElementById('formStudentData'), true);
//   document.getElementById('badgeNumber_error').innerHTML = "Searching students ...";
//   document.getElementById('badgeNumber_error').classList.remove("text-danger");
//   document.getElementById('badgeNumber_error').classList.add("text-success");
//   window.electronAPI.searchByBadge(badgeNumber);
// }
// //-------------------------------------------------------------------
// // invoked by the main ipc emit event 
// //-------------------------------------------------------------------
// window.electronAPI.searchByBadgeResult((result) => {
//   try {
//     console.log(`searchByBadgeResult was activated: ${JSON.stringify(result)}`)
//     setInputFormStatus(
//       document.getElementById('badgeNumber'), 
//       document.getElementById('badgeNumber_error'),
//       result);      
//     if (result.status != 'err') {
//       document.getElementById('badgeNumber_error').value = "Search was successful.";
//       document.getElementById('badgeNumber_error').classList.remove("text-danger");
//       document.getElementById('badgeNumber_error').classList.add("text-success");
//       document.getElementById('badgeNumber').value = result.badgeNumber;

//       document.getElementById('firstName').value = result.firstName;
//       document.getElementById('lastName').value = result.lastName;
//       document.getElementById('email').value = result.email;
//       document.getElementById('phoneHome').value = result.phoneHome;
//     } else {
//       document.getElementById('badgeNumber_error').classList.add("text-danger");
//       document.getElementById('badgeNumber_error').classList.remove("text-success");
//       //document.getElementById('badgeNumber').value = result.badgeNumber;
      
//       document.getElementById('firstName').value   = "";
//       document.getElementById('lastName').value    = null;
//       document.getElementById('email').value       = null;
//       document.getElementById('phoneHome').value   = null;
//     }
//     } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     setFormEnabled(document.getElementById('formStudentData'), false);
//   }
// })

// //-------------------------------------------------------------------
// // invoked by the save button click event
// //-------------------------------------------------------------------
// const saveButton = document.getElementById('saveButton')
// saveButton.addEventListener('click', () => {
//   console.log('Save button was clicked')
//   studentData = {
//     'badgeNumber' : document.getElementById('badgeNumber').value,
//     'firstName'   : document.getElementById('firstName').value,
//     'lastName'    : document.getElementById('lastName').value,
//     'email'       : document.getElementById('email').value,
//     'phoneHome' : document.getElementById('phoneHome').value,
//   }
//   console.log(`studentData: ${JSON.stringify(studentData)}`);
//   setFormEnabled(document.getElementById('formStudentData'), true);
//   document.getElementById('badgeNumber_error').innerHTML = "Updating student details ...";
//   document.getElementById('badgeNumber_error').classList.remove("text-danger");
//   document.getElementById('badgeNumber_error').classList.add("text-success");

//   window.electronAPI.saveStudentData(studentData);
// })

// //-------------------------------------------------------------------
// // invoked by the main ipc emit event 
// //-------------------------------------------------------------------
// window.electronAPI.saveStudentDataResult((result) => {
//   console.log(`saveStudentDataResult was activated: ${JSON.stringify(result)}`)
//   try {
//     setInputFormStatus(
//       document.getElementById('badgeNumber'), 
//       document.getElementById('badgeNumber_error'),
//       result.badgeNumber);
//     setInputFormStatus(
//       document.getElementById('firstName'), 
//       document.getElementById('firstName_error'),
//       result.firstName);
//     setInputFormStatus(
//       document.getElementById('lastName'), 
//       document.getElementById('lastName_error'),
//       result.lastName);
//     setInputFormStatus(
//       document.getElementById('email'), 
//       document.getElementById('email_error'),
//       result.lastName);
//     setInputFormStatus(
//       document.getElementById('phoneHome'), 
//       document.getElementById('phoneHome_error'),
//       result.lastName);
      
//     if (result.saveStatus == 'ok') {
//       document.getElementById('badgeNumber_error').innerHTML = result.saveMessage;
//       document.getElementById('badgeNumber_error').classList.remove("text-danger");
//       document.getElementById('badgeNumber_error').classList.add("text-success");
//     }
//     else {
//       document.getElementById('badgeNumber_error').innerHTML = result.saveMessage;
//       document.getElementById('badgeNumber_error').classList.add("text-danger");
//       document.getElementById('badgeNumber_error').classList.remove("text-success");
//     }
  
//     setTimeout(() => {
//       document.getElementById('badgeNumber_error').innerHTML = "&nbsp";
//     }, 2000);    
    
//   } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     setFormEnabled(document.getElementById('formStudentData'), false);
//     setFocusedField(result);
//   }
// })


// //-------------------------------------------------------------------
// // invoked by the generate badge button click event
// //-------------------------------------------------------------------
// const generateButton = document.getElementById('generateButton')
// generateButton.addEventListener('click', () => {
//   console.log('Generate button was clicked')
//   studentData = {
//     'badgeNumber' : document.getElementById('badgeNumber').value
//   }
//   console.log(`studentData: ${JSON.stringify(studentData)}`);
//   setFormEnabled(document.getElementById('formStudentData'), true);
//   document.getElementById('badgeNumber_error').innerHTML = "Generating student badge ...";
//   document.getElementById('badgeNumber_error').classList.remove("text-danger");
//   document.getElementById('badgeNumber_error').classList.add("text-success");
//   window.electronAPI.generateBadge(studentData);
// })
// //-------------------------------------------------------------------
// window.electronAPI.generateBadgeResult((result) => {
//   console.log(`generateBadgeResult was activated: ${JSON.stringify(result)}`)
//   setFormEnabled(document.getElementById('formStudentData'), false);
//   document.getElementById('badgeNumber_error').innerHTML = "Badge was generated";
//   document.getElementById('badgeNumber_error').classList.remove("text-danger");
//   document.getElementById('badgeNumber_error').classList.add("text-success");
// })


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// function setInputFormStatus(form_element, err_element, field_status, focus_field) {
//   if (field_status.status === 'err') {
//     err_element.innerHTML = field_status.msg;
//     form_element.classList.add("is-invalid"); 
//     form_element.focus(); 
//   }
//   else {
//     err_element.innerHTML = field_status.msg;
//     form_element.classList.remove("is-invalid"); 
//     form_element.classList.add("is-valid"); 
//   }
// }

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// function setFocusedField(result) {
//   if (result.badgeNumber.status === 'err') {
//     document.getElementById('badgeNumber').focus();
//     return;
//   }
//   if (result.firstName.status === 'err') {
//     document.getElementById('firstName').focus();
//     return;
//   }
//   if (result.lastName.status === 'err') {
//     document.getElementById('lastName').focus();
//     return;
//   }
//   if (result.email.status === 'err') {
//     document.getElementById('email').focus();
//     return;
//   }
//   if (result.phoneHome.status === 'err') {
//     document.getElementById('phoneHome').focus();
//     return;
//   }
// }

// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// function setFormEnabled(form, isDisabled) {
//   console.log(`setFormEnabled: ${isDisabled}`)
//   document.getElementById('searchButton').disabled = isDisabled;
//   document.getElementById('saveButton').disabled = isDisabled;
//   const elements = form.elements;
//   for (let i = 0; i < elements.length; i++) {
//     //elements[i].disabled = isDisabled;
//     if (trackedFields().indexOf(elements[i].id) > 0) {
//         elements[i].disabled = isDisabled;
//       }
//   }
// }

// function trackedFields() {
//   return [
//     'badgeNumber', 
//     'firstName', 
//     'lastName', 
//     'email', 
//     'phoneHome'
//   ]
// }

//-------------------------------------------------------------------
window.electronAPI.resetDisplay(() => {
  console.log(`Students resetDisplay was activated.`);
  for (let i = 0; i < trackedFields().length; i++) {
    document.getElementById(trackedFields()[i]).value = '';
  }
})

//-------------------------------------------------------------------
// invoked by the generate badge button click event
//-------------------------------------------------------------------
const selectPicture = document.getElementById('selectPicture');
selectPicture.addEventListener('click', () => {
  console.log('selectPicture button was clicked');
  window.electronAPI.selectPicture();
})
window.electronAPI.selectPictureResult((result) => {
  console.log(`selectPictureResult was activated`);
  studentPicture.src = `data:image/jpg;base64,${result}`
})

